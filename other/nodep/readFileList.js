const fs = require('fs')
const path = require('path')
const axios = require('./axios');
const { zip, unzip } = require('./zip.js');
const config = require('./config')
const cheerio = require('cheerio');
const fileList = './data/pornstars/list.txt'
async function run(list) {
    let output = './data'
    let paths = await readdirSync(output)
    fs.writeFileSync('./data/fileList.txt', zip(JSON.stringify({ data: paths })))
    console.log('end', paths && paths[0])
}

async function readdirSync(output, paths = []) {
    let files = fs.readdirSync(output)
    for (const key in files) {
        let filename = files[key]
        let p = path.join(output, filename)
        let stats = fs.statSync(p)
        if (stats.isDirectory()) {
            readdirSync(p, paths)
        } else {
            paths.push(p)
        }
    }
    return paths
}

module.exports = run