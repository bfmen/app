console.log('Hello World2');
const cheerio = require('cheerio');
const axios = require('axios');
const config = require('./config')
let url = config.url + '/pornstars'
start()

async function start() {
    // let data = await request(url)
    let data = (await axios(url, config.pornstars)).data
    const $ = cheerio.load(data);
    let children = $('#popularPornstars li .wrap')
    children = [...children].map(item => {
        let path = $(item).find('a').attr('href')
        let imgSrc = $(item).find('a img').attr('data-src')
        let pornStarName = $(item).find('.thumbnail-info-wrapper .pornStarName').text().trim()
        let [conut, times] = $(item).find('.videosNumber').text().replaceAll('\t','').replaceAll(' ','').replaceAll('views','').split('Videos')

        return {
            pornStarName,
            path,
            imgSrc,
            conut,
            times
        }
    })
    console.log(children)


    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/p');

    const Cat = mongoose.model('dog', require('./schema/example.schema.js'));

    const kitty = new Cat({ name: 'Zildjian4', living: true });
    kitty.save().then((res) => console.log('meow', res));
}