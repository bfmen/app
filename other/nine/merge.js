import axios from 'axios'
import fs from 'fs'
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import single from 'single-line-log'
const log = single.stdout
import config from './libs/config.js'
import utils from './libs/utils.js'
const URL = 'http://192.168.123.1'
export default async () => {
    let { data } = await axios(`${URL}:81/sf.php`)
    let array = []

    for (const key in data) {
        if (key.includes('/video/')) {
            array.push({ path: key, list: data[key], key: key.split('/').pop() })
        }
    }
    utils.console.log('array', array.length)
    let array2 = []
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        let m3u8 = item.list.find(name => name.toLocaleLowerCase().endsWith('.m3u8'))
        let tss = item.list.filter(name => name.toLocaleLowerCase().endsWith('.ts'))
        let { data } = await axios(`${URL}:888/Windows8/win11/91/video/${item.key}/${m3u8}`)
        let list = data.split('\n#').filter(item => item.startsWith('EXTINF:')).map(item => item.split(',\n')[1])
        let isExists = list.every(name => item.list.includes(name))
        if (isExists) array2.push(item)
    }
    utils.console.log('array2', array2.length)
    for (let index = 0; index < array2.length; index++) {
        const item = array2[index];
        let m3u8 = item.list.find(name => name.toLocaleLowerCase().endsWith('.m3u8'))
        let url = `${URL}:888/Windows8/win11/91/video/${item.key}/${m3u8}`
        let out = path.join(config.deployDir, 'video', item.key, m3u8) + '.mp4'
        console.log('out', url, out)
        let isDone = await ffmpegDown(url, out, index)
        debugger
        if (isDone) {

        }
    }
    debugger
}

async function ffmpegDown(url, out, key) {
    return new Promise((resolve, reject) => {
        ffmpeg(url)
            .on("error", error => {
                console.error("error", error);
                resolve(false);
            })
            .on('progress', function (progress) {
                if (progress) {
                    if (typeof progress.percent == 'number') {
                        log(`process${key}: ${(progress.percent).toFixed(2)}%`);
                    } else if (progress) {
                        log(`process${key}: ${JSON.stringify(progress)}`);
                    }
                }
            })
            .on("end", () => {
                log('process:  100%。\n');
                resolve(true);
            })
            .outputOptions("-c copy")
            .outputOptions("-bsf:a aac_adtstoasc")
            .output(out)
            .run();
    });
}
