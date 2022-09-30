import axios from 'axios'
import fs from 'fs'
import config from './libs/config.js'
import utils from './libs/utils.js'
const LIST = []
let END = false
export default async () => {
    let dataSource = await utils.file.getDataSource(config.dataSourceTxtName)
    let dataSourceKeys = Object.keys(dataSource)
    let lengthSource = dataSourceKeys.length
    for (let indexSource = 0; indexSource < dataSourceKeys.length; indexSource++) {
        if (END) return
        let key = dataSourceKeys[indexSource]
        await run()
        let index = LIST.length
        LIST.push(downloadOne(dataSource, key, lengthSource, indexSource).then(() => {
            LIST.splice(index, 1, 'ok')
        }).catch((err) => {
            console.log('downloadOne error', `${indexSource}/${lengthSource}`, err.message)
            LIST.splice(index, 1, 'error')
        }))
    }
}

async function run() {
    let loading = LIST.filter(item => item instanceof Promise)
    let errors = LIST.filter(item => item == 'error')
    if (errors.length >= config.errorMax * 2) {
        if (loading.length) {
            console.log('错误过多', errors.length, loading.length, '等待10s')
            await new Promise(res => setTimeout(res, 10000))
            await run()
        } else {
            console.log('错误过多', errors.length, '停止')
            END = true
        }
    } else if (errors.length >= config.errorMax) {
        console.log('错误太多', errors.length, '休息10s')
        await new Promise(res => setTimeout(res, 10000))
    } else if (loading.length >= config.errorMax) {
        await new Promise(res => setTimeout(res, 1000))
        await run()
    }
}

async function downloadOne(dataSource, key, lengthSource, indexSource) {
    let path = config.videoPath + '/' + key
    let item = dataSource[key]
    // 处理detail
    let detail = item.detail
    if (!detail || !detail.src) {
        let data = (await axios(item.href)).data
        detail = utils.format.detail(data).detail
        item.detail = detail
        if (detail.src) {
            if (!config.deployDir.startsWith('/')) {
                await utils.file.saveDataSource(config.dataSourceTxtName, dataSource)
            }
        } else {
            fs.mkdirSync(config.deployDir + '/video_error', { recursive: true }, () => { })
            fs.writeFileSync(config.deployDir + `/video_error/detial_${key}.html`, data)
            console.log(`写入detial_${key}.html`, path)
        }
    }
    // 处理img
    let imgName = path + '/' + item.img.split('/').pop()
    if (!fs.existsSync(imgName)) {
        let res = await axios({
            url: item.img,
            responseType: 'arraybuffer'
        })
        let data = res.data
        fs.mkdirSync(path, { recursive: true }, () => { })
        fs.writeFileSync(imgName, data, 'binary')
    }
    // 处理m3
    let arr = detail.src.split('/')
    let nameM3U8 = path + '/' + arr.pop()
    let strM3U8 = ''
    if (fs.existsSync(nameM3U8)) {
        strM3U8 = fs.readFileSync(nameM3U8).toString()
    } else {
        let res = (await axios(detail.src))
        strM3U8 = res.data
        fs.mkdirSync(path, { recursive: true }, () => { })
        fs.writeFileSync(nameM3U8, strM3U8)
    }
    // download
    let list = strM3U8.split('\n#').filter(item => item.startsWith('EXTINF:')).map(item => item.split(',\n')[1])
    let lengthList = Object.keys(list).length
    for (let i = 0; i < lengthList; i++) {
        let name = list[i]
        let indexList = Object.values(list).indexOf(name)
        let url = arr.join('/') + '/' + name
        let nameTS = path + '/' + url.split('/').pop()
        if (!fs.existsSync(nameTS)) {
            try {
                console.log('下载开始', `${indexSource}/${lengthSource} ${indexList}/${lengthList}`, nameTS)
                let res = await axios({
                    url,
                    responseType: 'arraybuffer'
                })
                let data = res.data
                if (data) {
                    fs.mkdirSync(path, { recursive: true }, () => { })
                    fs.writeFileSync(nameTS, data, 'binary')
                } else {
                    console.log('error1', `${indexSource}/${lengthSource} ${indexList}/${lengthList}`, res)
                }
                console.log('下载完毕', `${indexSource}/${lengthSource} ${indexList}/${lengthList}`, nameTS)
            } catch (error) {
                console.log('下载出错', `${indexSource}/${lengthSource} ${indexList}/${lengthList}`, error.code, error.message)
            }
        } else {
            console.log('跳过', `${indexSource}/${lengthSource} ${indexList}/${lengthList}`, nameTS)
        }
    }
}