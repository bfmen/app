const fs = require('fs');
const config = require('./config.js')
const axios = require('axios')
const { zip, unzip } = require('./zip.js');

let dataSource = {}
let dataSourceTxtName = config.dataSourceTxtName

start()

async function start() {
    let data = await getDataSource()
    dataSourceStr = data ? unzip(data) : '{}'
    dataSource = JSON.parse(dataSourceStr)
    console.log("初始", Object.keys(dataSource).length)

    for (let index = 0; index < Object.keys(dataSource).length; index++) {
        let key = Object.keys(dataSource)[index]
        let obj = dataSource[key]
        let path = `./play_url/${obj.vodid}`
        if (!fs.existsSync(path)) {
            console.log('key 下载', obj.vodid, `${index}/${Object.keys(dataSource).length}`)
            try {
                let res = await axios({
                    url: config.origin + obj.play_url,
                    params: config.query(),
                })
                let data = res.data
                if (data) {
                    // obj.play_data = data
                    await new Promise((resolve, reject) => {
                        fs.mkdir('./play_url', resolve)
                    })
                    
                    fs.writeFileSync(path, JSON.stringify(data))
                } else {
                    console.log('error1', res)
                }
            } catch (error) {
                console.log('error2', error.code, error.message)
            }
            // await new Promise(resolve => setTimeout(resolve, 100))
        } else {
            console.log('key 跳过', obj.vodid, `${index}/${Object.keys(dataSource).length}`)
        }
    }
    console.log('完成', Object.keys(dataSource).length)
}

async function getDataSource() {
    return await new Promise((resolve, reject) => {
        fs.readFile(dataSourceTxtName, function (err, data) {
            resolve(data)
        });
    })
}
