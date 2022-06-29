const fs = require("fs");
const path = require("path");
const m3u8ToMp4 = require("./m3u8ToMp4.js"); // 引入核心模块，注意路径
const converter = new m3u8ToMp4();

// 具体参数可自行修改
downloadMedia({});

function downloadMedia(opt, callback) {
    // 测试视频，如果链接失效的话就自己找一个
    let url = opt.url || "https://e1v-h.phncdn.com/hls/videos/202205/24/408676281/,1080P_4000K,720P_4000K,480P_2000K,240P_1000K,_408676281.mp4.urlset/index-f1-v1-a1.m3u8?validfrom=1655483423&validto=1655490623&ip=52.163.244.188&ipa=52.163.244.188&hdl=-1&hash=Cu2sgeqxLCWjG4uqInGo3JWjtzQ%3D&&";
    let output = opt.output || 'video';
    let filename = opt.filename ? ( opt.filename + '.mp4') : `video_${new Date().getTime()}.mp4`;
    let title = opt.title || '测试视频';

    if (!fs.existsSync(output)) {
        fs.mkdirSync(output, {
            recursive: true,
        });
    }

    (async function () {
        try {
            console.log("准备下载...");

            await converter
                .setInputFile(url)
                .setOutputFile(path.join(output, filename))
                .start();

            console.log("下载完成!");

            if (typeof callback === 'function') callback();
        } catch (error) {
            console.log('error', error)
            throw new Error("哎呀，出错啦! 检查一下参数传对了没喔。", error);
        }
    })();

}

