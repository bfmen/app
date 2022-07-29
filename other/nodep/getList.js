
const fs = require('fs');
const axios = require('./axios');
const config = require('./config')
const { zip, unzip } = require('./zip.js');
const cheerio = require('cheerio');
const fileList = './data/pornstars/list.txt'
const maxPage = 10
const params = ['o=tr&t=a', 'o=mv&t=a', 'o=mv&t=a&cc=jp']
let dataSource = {}

async function run() {
    for (const param of params) {
        await start(param)
    }
    saveList()
}

async function start(param, page = 1) {
    if (page > maxPage) {
        return
    }
    console.log('start', page, param)
    let url = config.urlCn + `/video?${param}&page=${page}`
    let res = (await axios({
        url
    }))

    if (res && res.data) {
        let data = res.data
        fs.writeFileSync('./data/pornstars/list.html', data)
        const $ = cheerio.load(data);
        let pcVideoListItems = [...$('#videoCategory .pcVideoListItem')]
        let list = pcVideoListItems.map(element => {
            let id = element.attribs['data-id']
            let vkey = element.attribs['data-video-vkey']
            let a = cheerio.load(element)('.phimage a')[0]
            let title = a.attribs['title']
            let src = cheerio.load(a)('img')[0].attribs['data-src']
            let webm = cheerio.load(a)('img')[0].attribs['data-mediabook']
            let duration = cheerio.load(a)('[class=duration]').text()
            let thumbnail = cheerio.load(a)('[class=hd-thumbnail]').text()
            let views = formatNumber(cheerio.load(element)('.videoDetailsBlock .views var').text())
            let rating = formatNumber(cheerio.load(element)('.videoDetailsBlock .rating-container .value').text())
            let added = cheerio.load(element)('.videoDetailsBlock .added').text()
            let user = ''
            try { user = cheerio.load(element)('.usernameWrap a')[0].attribs['href'] } catch (error) { }
            return { id, vkey, title, src, webm, duration, thumbnail, views, rating, added, user }
        })
        list.reduce((item1, item2) => {
            item1[item2.id] = { ...item2 }
            delete item1[item2.id].id
            return item1
        }, dataSource)
        if (Object.keys(dataSource).length > 1000) {

        }
        await require('./getListData')(dataSource)
        saveList()
        if (list.length < 10) {
            return
        } else {
            await start(param, ++page)
        }

    } else {
        await start(param, ++page)
    }
}

async function saveList() {
    console.log('saveList1', Object.keys(dataSource).length)
    let path = fileList
    try {
        dataSource = { ...JSON.parse(unzip(fs.readFileSync(path))), ...dataSource }
    } catch (error) { }
    console.log('saveList2', Object.keys(dataSource).length)
    dataSourceStr = zip(dataSource)
    fs.writeFileSync(path, dataSourceStr)
    dataSource = {}
}


function formatNumber(str) {
    let arr = [{ key: 'B', pow: 9 }, { key: 'M', pow: 6 }, { key: 'K', pow: 3 }]
    let item = arr.find(item => str.endsWith(item.key))
    if (item) {
        str = parseFloat(str.replaceAll(item.key, '')) * Math.pow(10, item.pow) || 0
    }
    return parseInt(str)
}

module.exports = run
