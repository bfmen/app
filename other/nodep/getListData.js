const fs = require('fs')
const axios = require('axios')
const { zip, unzip } = require('./zip.js');
const fileList = './data/pornstars/list.txt'
async function run(list) {
    let dataSource = list || getList()
    let ids = Object.keys(dataSource)
    for (let i = 0 ; i < ids.length ; i++) {
        console.log('start', `${i}/${ids.length}`, i / ids.length)
        let id = ids[i]
        let item = dataSource[id]
        await downloadFile(item.src, `./data/pornstars/img/${id}.${item.src.split('.').pop()}`)
        await downloadFile(item.webm, `./data/pornstars/webm/${id}.webm`)
    }
}

async function downloadFile(url, path) {
    if (url) {
        if (!fs.existsSync(path)) {
            console.log('download', path)
            try {
                let res = await axios({
                    url: url,
                    responseType: 'arraybuffer'
                })
                let data = res.data
                if (data) {
                    fs.writeFileSync(path, data, 'binary')
                } else {
                    console.log('error1', path, res)
                }
            } catch (error) {
                console.log('error2', path, error.code, error.message)
            }
        }else{
            console.log('download jump', path)
        }
    }
}

function getList() {
    let path = fileList
    let dataSource = {}
    try {
        dataSource = { ...JSON.parse(unzip(fs.readFileSync(path))), ...dataSource }
    } catch (error) { console.log('getList', error) }
    return dataSource
}

module.exports = run