const axios = require('axios')
const { zip, unzip } = require('./zip.js');


start()

async function start() {
    console.log('start')
    let res = await axios({
        url: 'https://smanx.vercel.app/other/s_banana/dataSource.txt'
    })
    let data = JSON.parse(unzip(res.data))
    console.log('ssss', typeof res.data, typeof data, Object.keys(data).length)
}