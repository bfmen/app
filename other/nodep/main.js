const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('./axios');
const config = require('./config')
let url = config.url + '/pornstars'
const Star = mongoose.model('star', require('./schema/star.schema.js'));
start()

async function start() {
    // await getAllStart()
    let error = await downLoadForViewkey('ph62251209de802')
    console.log('error', error)
}

async function downLoadForViewkey(viewkey) {
    
    let url = config.view_video
    let res = (await axios({ url: config.view_video + '?viewkey=' + viewkey }))
    data = res.data
    const $ = cheerio.load(data);
    let title = $('title').text()
    let cccc = $('script')
    let str = [...cccc].find((item, index) => {
        return $(item).text().includes('player_mp4_seek')
    }).children[0].data
    let idd = str.split('flashvars_')[1].split(' =')[0]
    // str = str.replaceAll('\"',`'`) + ';playerObjList.flashvars=flashvars_' + idd
    // let playerObjList = {}
    // let dsa = eval(str)
    let [id, qualityItemsSring] = str.split('qualityItems_')[1].split(';')[0].split(' = ')
    let qualityItems = JSON.parse(qualityItemsSring)
    let qualityHigh = qualityItems.reverse().find(item => item.url)

    // let sdas = str.split('var player_mp4_seek = "start";')[1].split('var nextVideoPlaylistObject')[0]


    const m3u8ToMp4 = require("./m3u8ToMp4.js"); // 引入核心模块，注意路径
    const converter = new m3u8ToMp4();
    let videoUrl = qualityHigh.url
    // videoUrl = 'https://ev-h.phncdn.com/hls/videos/202203/06/404187371/,1080P_4000K,720P_4000K,480P_2000K,240P_1000K,_404187371.mp4.urlset/master.m3u8?validfrom=1655735619&validto=1655742819&ipa=20.212.10.72&hdl=-1&hash=PsyHeGnWXT19%2Bubl9yBQ%2F9%2Fcyhg%3D&'
    // videoUrl = 'https://e1v-h.phncdn.com/hls/videos/202205/24/408676281/,1080P_4000K,720P_4000K,480P_2000K,240P_1000K,_408676281.mp4.urlset/index-f1-v1-a1.m3u8?validfrom=1655483423&validto=1655490623&ip=52.163.244.188&ipa=52.163.244.188&hdl=-1&hash=Cu2sgeqxLCWjG4uqInGo3JWjtzQ%3D&&'
    let output = config.filePath;
    let filename = `${title}_${viewkey}_${qualityHigh.text}.mp4`

    const fs = require('fs');
    const path = require('path');
    if (!fs.existsSync(output)) {
        fs.mkdirSync(output, {
            recursive: true,
        });
    }
    try {
        console.log("准备下载...");

        await converter
            .setInputFile(videoUrl)
            .setOutputFile(path.join(output, filename))
            .start();

        console.log("下载完成!");

        return null;
    } catch (error) {
        // console.log('error', error)
        // throw new Error("哎呀，出错啦! 检查一下参数传对了没喔。", error);
        return error
    }
}


async function getAllStart(page = 1) {
    let res = (await axios({ url, params: { ...config.pornstars, page } }))
    data = res.data
    const $ = cheerio.load(data);
    let children = $('#popularPornstars li .wrap')
    children = [...children].map(item => {
        let path = $(item).find('a').attr('href')
        let imgSrc = $(item).find('a img').attr('data-src')
        let name = $(item).find('.thumbnail-info-wrapper a.title').text().trim()
        let [conut, times] = $(item).find('.videosNumber').text()
            .replaceAll('\t', '')
            .replaceAll(' ', '')
            .replaceAll('views', '')
            .split('Videos')
            .map(str => {
                if (str.endsWith('B')) str = str.replaceAll('B', '') * Math.pow(10, 9)
                else if (str.endsWith('M')) str = str.replaceAll('M', '') * Math.pow(10, 6)
                else if (str.endsWith('K')) str = str.replaceAll('K', '') * Math.pow(10, 3)
                return parseInt(str)
            })
        if (!name || name == 'unknown') {
            console.log('name', path)
        }
        return {
            name,
            path,
            imgSrc,
            conut,
            times
        }
    }).filter(item => item.name !== 'unknown')
    if (!children.length) {
        console.log('getAllStart end')
    } else {
        await saveStars(children)
        await downloadStars(children)
        console.log('page', page, children.length)
        await getAllStart(++page)
    }

}

async function downloadStars(stars) {
    for (const star of stars) {
        let path = './stars' + star.path.split('/').slice(0, 2).join('/')
        let name = star.name + '.' + star.imgSrc.split('.').pop()
        console.log('downloadStar1', path, name)
        let res = await downloadFile(star.imgSrc, path, name, 1000)
        if (res) {
            console.log('downloadStars error', star.imgSrc, res, 600000)
            await new Promise(resolve => setTimeout(resolve, 60000))
            return await downloadStars(stars)
        }
        console.log('downloadStar2', path, name)
    }
}

async function downloadFile(url, path, name, timeout) {
    const axios = require('axios');
    const fs = require('fs');
    await new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, function (res) {
            res ? reject(res) : resolve(res)
        })
    })
    let dsa = path + '/' + name
    if (!fs.existsSync(dsa)) {
        try {
            await new Promise(resolve => setTimeout(resolve, timeout || 0))
            const res = await axios.get(url, {
                responseType: 'arraybuffer', // 特别注意，需要加上此参数
            });
            fs.writeFileSync(dsa, res.data);
        } catch (error) {
            return error
        }
    }
}

async function saveStar(star, Star, key) {
    const kitty = new Star(star);
    let data = await Star.findOne({ [key]: star[key] })
    if (data) {
        let res = await kitty.update({ [key]: star[key] })
        console.log('saveStar2', star.name)
    } else {
        let res = await kitty.save();
        console.log('saveStar1', star.name)
    }
}
async function saveStars(stars) {
    mongoose.connect(config.mongodbUrl);
    for (const star of stars) {
        await saveStar(star, Star, 'name')
    }
}

