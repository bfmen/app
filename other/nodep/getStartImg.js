const fs = require('fs')
const axios = require('axios')
const { zip, unzip } = require('./zip.js');

async function run() {
    let dataSource = getDetail()
    for (const id in dataSource) {
        let item = dataSource[id]
        let url = item.src
        if (url) {
            let path = `./data/pornstars/img/${id}.${url.split('.').pop()}`
            try {
                let res = await axios({
                    url: url,
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
        }
    }
}

function getDetail() {
    let path = './data/pornstars/detail.txt'
    let dataSource = {}
    try {
        dataSource = { ...JSON.parse(unzip(fs.readFileSync(path))), ...dataSource }
    } catch (error) { console.log('getDetail', error) }
    return dataSource
}

module.exports = run