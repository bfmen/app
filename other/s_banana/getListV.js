const fs = require('fs');
const config = require('./config.js')
const axios = require('axios')
const { zip, unzip } = require('./zip.js');

let dataSource = {}
let dataSourceTxtName = config.dataSourceTxtName

start()

async function start() {

    var ip = await require('qiao-get-ip').getIp();
    console.log(ip);

    let data = await getDataSource()
    dataSourceStr = data ? unzip(data) : '{}'
    dataSource = JSON.parse(dataSourceStr)
    console.log("初始", Object.keys(dataSource).length)

    for (let index = 0; index < Object.keys(dataSource).length; index++) {
        let key = Object.keys(dataSource)[index]
        let obj = dataSource[key]
        if (!obj.play_url_data) {
            console.log('v 下载', obj.vodid, `${index}/${Object.keys(dataSource).length}`)
            try {
                let res = await axios({
                    url: config.origin + obj.play_url,
                    params: config.query(),
                })
                let data = res.data
                if (data) {
                    obj.play_url_data = data
                    if (index % 1000 == 0) await saveFile(dataSource)
                    console.log('v 更新', obj.vodid, dataSource[key].play_url_data.retcode, `${index}/${Object.keys(dataSource).length}`)
                } else {
                    console.log('v 跳过2 no data', obj.vodid, data && data.errmsg && data.retcode, `${index}/${Object.keys(dataSource).length}`)
                }
            } catch (error) {
                console.log('跳过3 error', error.code, error.message)
            }
            // await new Promise(resolve => setTimeout(resolve, 100))
        } else {
            console.log('v 跳过1', obj.vodid, `${index}/${Object.keys(dataSource).length}`, obj.play_url_data.retcode)
        }
    }
    console.log('完成1', Object.keys(dataSource).length)
    await saveFile(dataSource)
    console.log('完成', Object.keys(dataSource).length)
}

async function getDataSource() {
    return await new Promise((resolve, reject) => {
        fs.readFile(dataSourceTxtName, function (err, data) {
            resolve(data)
        });
    })
}

async function saveFile(dataSource = dataSource) {
    let dataSourceStr = zip(dataSource)
    await new Promise((resolve, reject) => {
        fs.writeFile(dataSourceTxtName, dataSourceStr, (err) => {
            if (err) {
                console.log('写入错误', err);
                reject(err)
            }
            console.log("写入成功", Object.keys(dataSource).length, '压缩比例', dataSourceStr.length / JSON.stringify(dataSource).length)
            resolve()
        })
    })
}
