
const fs = require('fs');
const axios = require('./axios');
const config = require('./config')
const { zip, unzip } = require('./zip.js');
const cheerio = require('cheerio');
const fetch = require('node-fetch')

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

async function start(star, page = 1) {
    if (page > 10) {
        return
    }
    console.log('start', star.path, page)
    let url = config.urlCn + `${star.path}?page=${page}`
    let res = (await axios({
        url
    }))
    data = res.data

    if (data) {
        fs.writeFileSync('./data/pornstars/detail.html', data)
        const $ = cheerio.load(data);
        let pcVideoListItems = [...$('.pcVideoListItem')]
        let list = pcVideoListItems.map(element => {
            let id = element.attribs['data-id']
            let vkey = element.attribs['data-video-vkey']
            let a = cheerio.load(element)('.phimage a')[0]
            let title = a.attribs['title']
            let src = cheerio.load(a)('img')[0].attribs['data-src']
            let duration = cheerio.load(a)('[class=duration]').text()
            let thumbnail = cheerio.load(a)('[class=hd-thumbnail]').text()
            let views = formatNumber(cheerio.load(element)('.videoDetailsBlock .views var').text())
            let rating = formatNumber(cheerio.load(element)('.videoDetailsBlock .rating-container .value').text())
            let added = cheerio.load(element)('.videoDetailsBlock .added').text()
            let user = ''
            try { user = cheerio.load(element)('.usernameWrap a')[0].attribs['href'] } catch (error) { }
            return { id, vkey, title, src, duration, thumbnail, views, rating, added, user }
        })
        saveDetail(list)
        // let test2 = list.filter(item=>item.user.split('/').pop()==star.path.split('/').pop())
        // console.log('test2', test2.length)
        // if (list.length < 33) {
        //     return
        // } else {
        //     await start(star, ++page)
        // }

    } else {
        await start(star, page)
    }
}

async function saveDetail(list) {
    let path = './data/pornstars/detail.txt'
    let dataSource = {}
    try {
        dataSource = {...JSON.parse(unzip(fs.readFileSync(path))), ...dataSource}
    } catch (error) { }
    list.reduce((item1, item2)=>{
        item1[item2.id] = {...item2}
        delete item1[item2.id].id
        return item1
    }, dataSource)
    console.log('saveDetail', Object.keys(dataSource).length)
    dataSourceStr = zip(dataSource)
    fs.writeFileSync(path, dataSourceStr)
}


function formatNumber(str) {
    let arr = [{ key: 'B', pow: 9 }, { key: 'M', pow: 6 }, { key: 'K', pow: 3 }]
    let item = arr.find(item => str.endsWith(item.key))
    if (item) {
        str = parseFloat(str.replaceAll(item.key, '')) * Math.pow(10, item.pow) || 0
    }
    return parseInt(str)
}

function getDataSource() {
    let path = './data/pornstars/pornstars.txt'
    let dataSource = {}
    try { dataSource = { ...JSON.parse(unzip(fs.readFileSync(path))), ...dataSource } } catch (error) { }
    return dataSource
}

module.exports = run

