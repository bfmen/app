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
        console.log('downloadOne', lengthLoading(), lengthOK(), lengthError(), lengthAll(), `${indexSource}/${lengthSource}`)
        let key = dataSourceKeys[indexSource]
        await run()
        let index = LIST.length
        LIST.push(downloadOne(dataSource, key, lengthSource, indexSource).then(() => {
            LIST.splice(index, 1, 'ok')
        }).catch((err) => {
            console.log('downloadOne error', `${indexSource}/${lengthSource}`, err.message || err)
            LIST.splice(index, 1, 'error' + err.message || err)
        }))
        if (!config.deployDir.startsWith('/') && indexSource % 10 == 0) {
            await utils.file.saveDataSource(config.dataSourceTxtName, dataSource)
        }
    }
}

async function run() {
    if (lengthError() >= config.errorMax * 2) {
        if (lengthLoading()) {
            console.log('错误过多', lengthError(), lengthLoading(), '等待10s')
            await new Promise(res => setTimeout(res, 10000))
            await run()
        } else {
            console.log('错误过多', lengthError(), '停止')
            END = true
        }
    } else if (lengthError() >= config.errorMax) {
        console.log('错误太多', lengthError(), '休息10s')
        await new Promise(res => setTimeout(res, 10000))
    } else if (lengthLoading() >= config.line) {
        await new Promise(res => setTimeout(res, 1000))
        await run()
    }
}

async function downloadOne(dataSource, key, lengthSource, indexSource) {
    let basePath = config.videoPath + '/' + key
    let item = dataSource[key]
    // 处理detail
    let detail = item.detail
    let fileList = utils.file.getFiles(basePath)
    let filename = fileList.find(name => name.toLocaleLowerCase().endsWith('.m3u8'))
    if ((!detail || !detail.src) && !filename) {
        let pathDetail = config.deployDir + '/video_error'
        let pathDetailName = pathDetail + `/detial_${key}.html`
        if (!fs.existsSync(pathDetailName)) {
            let data = (await axios(item.href)).data
            detail = utils.format.detail(data).detail
            if (detail.src) {
                item.detail = detail
            } else {
                fs.mkdirSync(config.deployDir + '/video_error', { recursive: true }, () => { })
                fs.writeFileSync(config.deployDir + `/video_error/detial_${key}.html`, data)
                console.log(`解析出错${pathDetailName}`)
                throw `error, 解析出错下载${pathDetailName}`
            }
        } else {
            throw `error, 解析出错存在${pathDetailName}`
        }

    }
    // 处理m3
    let arr = detail.src.split('/')
    let nameM3U8 = basePath + '/' + arr.pop()
    if (!nameM3U8.toLowerCase().endsWith('.m3u8')) {
        throw `error, 文件后缀错误${nameM3U8}`
    }
    let strM3U8 = ''
    if (fs.existsSync(nameM3U8)) {
        strM3U8 = fs.readFileSync(nameM3U8).toString()
    } else {
        let res = (await axios(detail.src))
        strM3U8 = res.data
        fs.mkdirSync(basePath, { recursive: true }, () => { })
        fs.writeFileSync(nameM3U8, strM3U8)
    }
    // 处理img
    let imgName = basePath + '/' + item.img.split('/').pop()
    if (!fs.existsSync(imgName)) {
        let res = await axios({
            url: item.img,
            responseType: 'arraybuffer'
        })
        let data = res.data
        fs.mkdirSync(basePath, { recursive: true }, () => { })
        fs.writeFileSync(imgName, data, 'binary')
    }
    // download
    let list = strM3U8.split('\n#').filter(item => item.startsWith('EXTINF:')).map(item => item.split(',\n')[1])
    let lengthList = Object.keys(list).length
    for (let i = 0; i < lengthList; i++) {
        let name = list[i]
        let indexList = Object.values(list).indexOf(name)
        let url = arr.join('/') + '/' + name
        let nameTS = basePath + '/' + url.split('/').pop()
        if (!fs.existsSync(nameTS)) {
            try {
                console.log('下载开始', `${indexSource}/${lengthSource} ${indexList}/${lengthList}`, nameTS)
                let res = await axios({
                    url,
                    responseType: 'arraybuffer'
                })
                let data = res.data
                if (data) {
                    fs.mkdirSync(basePath, { recursive: true }, () => { })
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

function lengthLoading() {
    return LIST.filter(item => item instanceof Promise).length
}

function lengthError() {
    return LIST.filter(item => item.includes && item.startsWith('error')).length
}

function lengthOK() {
    return LIST.filter(item => item.includes && item.startsWith('ok')).length
}

function lengthAll() {
    return LIST.length
}