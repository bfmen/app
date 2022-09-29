import axios from 'axios'
import fs from 'fs'
import config from './libs/config.js'
import utils from './libs/utils.js'
const LIST = []
export default async () => {
    let dataSource = await utils.file.getDataSource(config.dataSourceTxtName)
    let lengthSource = Object.keys(dataSource).length
    for (const key in dataSource) {
        await run(dataSource, key, lengthSource)
        let index = LIST.length
        LIST.push(downloadOne(dataSource, key, lengthSource).then(() => {
            LIST.splice(index, 1, 'ok')
        }).catch(() => {
            LIST.splice(index, 1, 'error')
        }))
    }
}

async function run(dataSource, key, lengthSource) {
    let loading = LIST.filter(item => item instanceof Promise)
    if (loading.length >= config.line) {
        await new Promise(res => setTimeout(res, 1000))
        await run()
    }
}

async function downloadOne(dataSource, key, lengthSource) {
    let indexSource = Object.keys(dataSource).indexOf(key)
    let path = config.videoPath + '/' + key
    fs.mkdirSync(path, { recursive: true }, () => { })
    let item = dataSource[key]
    // 处理img
    let imgName = path + '/' + item.img.split('/').pop()
    if (!fs.existsSync(imgName)) {
        let res = await axios({
            url: item.img,
            responseType: 'arraybuffer'
        })
        let data = res.data
        fs.writeFileSync(imgName, data, 'binary')
    }
    // 处理detail
    let detail = item.detail
    if (!detail) {
        detail = utils.format.detail((await axios(item.href)).data).detail
        item.detail = detail
        await utils.file.saveDataSource(config.dataSourceTxtName, dataSource)
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
        fs.writeFileSync(nameM3U8, strM3U8)
    }
    // download
    let list = strM3U8.split('\n#').filter(item => item.startsWith('EXTINF:')).map(item => item.split(',\n')[1])
    let lengthList = Object.keys(list).length
    for (const name of list) {
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