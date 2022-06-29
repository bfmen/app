const fs = require('fs');
const config = require('./config.js')
const axios = require('axios')
const { zip, unzip } = require('./zip.js');
let dataSourceStr = ''
let dataSourceTxtName = 'dataSource.txt'
let dataSourceJsonName = 'dataSource.json'

start()

async function start(){
    dataSource = unzip(await getDataSource())
    await loadData(1)
}

async function getDataSource() {
    return await new Promise((resolve, reject) => {
        fs.readFile(dataSourceTxtName, function (err, data) {
            resolve(data)
         });
    })
}

async function getDataSource2() {
    return await new Promise((resolve, reject) => {
        fs.readFile(dataSourceJsonName, function (err, data) {
            resolve(data)
         });
    })
}

async function loadData(page) {
    console.log('loadData', page)
    const url = config.origin + '/vod/latest-0-0-0-0-0-0-0-0-0-' + page;
    let res = await axios({
        url,
        params: {
            ...config.query(),
        },
    })
    if (res && res.data && res.data.retcode == 0) {
        if (res.data.data.vodrows.length) {
            await saveData(res.data.data.vodrows)
            await saveFile()
            await loadData(++page)
        } else {
            console.log('结束', page, res)
        }
    } else {
        console.log('error', res)
        await loadData(page)
    }
}

async function saveData(data) {
    let addNum = 0
    let upNum = 0
    data.forEach(item => {
        if (dataSource[item.vodid]) {
            upNum++
        } else {
            addNum++
        }
        dataSource[item.vodid] = item
    });
    console.log('saveData', addNum, upNum)
}

async function saveFile() {
    let dataSourceStr = zip(dataSource)
    await new Promise((resolve, reject) => {
        fs.unlink(dataSourceTxtName, function(err) {
            fs.writeFile(dataSourceTxtName,dataSourceStr,(err)=>{
                if (err) {
                    console.log('写入错误', err);
                    reject(err)
                }
                console.log("写入成功", Object.keys(dataSource).length)
                resolve()
            })
        
         });
    })
}



