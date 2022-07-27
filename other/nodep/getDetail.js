
const fs = require('fs');
const axios = require('./axios');
const config = require('./config')
const { zip, unzip } = require('./zip.js');
const cheerio = require('cheerio');

async function run() {
    let dataSource = getDataSource()
    let dataSources = Object.keys(dataSource).reduce((item1, key) => {
        item1.push({ ...dataSource[key], name: key })
        return item1
    }, []).sort((i, j) => j.times - i.times)
    console.log(dataSources.map(item => item.times).slice(0, 10))
    for (const key in dataSources) {
        await start(dataSources[key])
    }
}

async function start(item, page = 1) {
    if (page > 10) {
        return
    }
    let url = config.url + `/pornstar/sasha-grey?page=${page}`
    let res = (await axios({ url }))
    data = res.data
    if (data) {
        const $ = cheerio.load(data);
        let title = $('title').text()
        let cccc = $('script')
        await start(item, ++page)
    } else {
        await start(item, page)
    }
}

function getDataSource() {
    let path = './data/pornstars/pornstars.txt'
    let dataSource = {}
    try { dataSource = { ...JSON.parse(unzip(fs.readFileSync(path))), ...dataSource } } catch (error) { }
    return dataSource
}

module.exports = run

