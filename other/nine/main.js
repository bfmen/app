import fs from 'fs'
import axios from 'axios'
import config from './libs/config.js'
import utils from './libs/utils.js'
import down from './down.js'
axios.defaults.headers.common = { ...axios.defaults.headers.common, ...config.headers }
const argv2 = process.argv[2]
let dataSourceStr = ''
let dataSource = {}
let dataSourceTxtName = config.dataSourceTxtName

// yarn netlify login
// yarn netlify deploy --prod --dir=dist_deploy

start()

async function start() {
    fs.mkdir(config.deployDir, { recursive: true }, () => { })
    dataSource = await utils.file.getDataSource(dataSourceTxtName)
    console.log("初始", Object.keys(dataSource).length)
    console.log('start loadData')
    if (!argv2 || argv2 === 'list') await loadData(1)
    console.log('end loadData')
    if (!argv2 || argv2 === 'video') await down()
    console.log('end down')
    console.log('end')
}

async function loadData(page) {
    const url = config.origin + `/v.php?page=${page}${config.category}`;
    console.log('loadData1', page, '页', url)
    try {
        let res = await axios({ url })
        if (res && res.data) {
            let obj = utils.format.all(res.data)
            let listV = obj.listV
            console.log('loadData2', `${page}/${obj.totalpage}`, listV.map(item => item.viewkey).join(','))
            if (process.argv[3] != 'all') {
                let details = await Promise.all(listV.map(item => {
                    if (dataSource[item.viewkey] && dataSource[item.viewkey].detail && dataSource[item.viewkey].detail.src) {
                        return Promise.resolve(dataSource[item.viewkey].detail)
                    } else {
                        return axios(item.href).then(res => utils.format.detail(res.data).detail)
                    }
                }))
                details.forEach((detail, index) => {
                    if (detail.src) {
                        listV[index].detail = detail
                    }
                })
            }
            let isCompleted = saveData(listV)
            await utils.file.saveDataSource(dataSourceTxtName, dataSource)
            if (listV.length == 0 || obj.totalpage <= page) {
                console.log('结束24', `${page}/${obj.totalpage}`)
            } else {
                await loadData(++page)
            }
        } else {
            console.log('error', res)
            await loadData(page)
        }
    } catch (error) {
        console.log('网络错误, 再来', error.code, error.message, url)
        await new Promise(res => setTimeout(res, 1000))
        await loadData(page)
    }
}

function saveData(data) {
    let addNum = 0
    let upNum = 0
    data.forEach(item => {
        if (dataSource[item.viewkey]) {
            upNum++
        } else {
            addNum++
        }
        dataSource[item.viewkey] = { ...dataSource[item.viewkey], ...item }
    });
    console.log('saveData', 'add', addNum, 'update', upNum)
    return upNum == 24
}



