global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const fs = require('fs');
const config = require('./config')
const { zip, unzip } = require('./zip.js');
var Bmob = require('./libs/Bmob-2.4.0.min');
Bmob.initialize(config.bananaBomb.secretKey, '123456');
const query = Bmob.Query('Like');
start()
async function start() {
    await file2csv()
}

async function file2csv() {
    const max = 500
    let data = await getDataSource()
    dataSourceStr = data ? unzip(data) : '{}'
    dataSource = JSON.parse(dataSourceStr)
    let array = Object.keys(dataSource).map(item => dataSource[item]).sort((a, b) => a.vodid - b.vodid)
    let keys = ['vodid', 'title', 'coverpic', 'createtime', 'updatetime', 'scorenum', 'downnum', 'play_url', 'definition', 'duration', 'mosaic', 'view_price', 'isvip', 'islimit', 'islimitv3', 'commentcount', 'playcount_total', 'areaname', 'catename', 'play_url_data']
    let queryArray = array.map(item => {
        return keys.reduce((obj, key) => {
            obj[key] = (typeof item[key] == 'number' ? String(item[key]) : item[key]) || ''
            return obj
        }, {})
    })
    let text = ``
    text += (keys.join(',') + '\r\n')
    // array = [1, 2, 3, 4, 5, 6, 7, 8]
    array.forEach(item => {
        let arr = keys.map(key => {
            if (typeof item[key] == 'number') {
                return String(item[key])
            } else if (typeof item[key] == 'object') {
                return JSON.stringify(item[key])
            } else {
                return item[key] || ''
            }
        })
        text += (arr.join(',') + '\r\n')
    })
    let path = './data/csv/list'
    fs.mkdirSync(path, {recursive: true})
    fs.writeFileSync(`${path}/${Date.now()}.csv`, text)
    console.log("初始", Object.keys(dataSource).length)
}



async function getDataSource() {
    return await new Promise((resolve, reject) => {
        fs.readFile(config.dataSourceTxtName, function (err, data) {
            resolve(data)
        });
    })
}
