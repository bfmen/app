const fs = require('fs');
const config = require('./config.js')
const axios = require('axios')
const { zip, unzip } = require('./zip.js');

let dataSource = {}
let dataSourceTxtName = config.dataSourceTxtName

async function start() {
    let data = await getDataSource()
    dataSourceStr = data ? unzip(data) : '{}'
    dataSource = JSON.parse(dataSourceStr)
    console.log("初始", Object.keys(dataSource).length)

    for (let index = 0; index < Object.keys(dataSource).length; index++) {
        let key = Object.keys(dataSource)[index]
        let obj = dataSource[key]
        let path = `./coverpic/${obj.vodid}`
        if (!fs.existsSync(path)) {
            console.log('key 下载', obj.vodid, `${index}/${Object.keys(dataSource).length}`)
            try {
                let res = await axios({
                    url: obj.coverpic,
                    responseType: 'arraybuffer'
                })
                let data = res.data
                if (data) {
                    fs.writeFileSync(path, data, 'binary')
                } else {
                    console.log('error1', res)
                }
            } catch (error) {
                console.log('error2', error.code, error.message)
            }
            // await new Promise(resolve => setTimeout(resolve, 100))
        } else {
            if (index % 1000 == 0) console.log('key 跳过', obj.vodid, `${index}/${Object.keys(dataSource).length}`)
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

module.exports = start