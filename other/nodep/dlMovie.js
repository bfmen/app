const fs = require("fs");
const path = require("path");
const m3u8ToMp4 = require("./m3u8ToMp4.js"); // 引入核心模块，注意路径
const converter = new m3u8ToMp4();

// 具体参数可自行修改
downloadMedia({});

function downloadMedia(opt, callback) {
    // 测试视频，如果链接失效的话就自己找一个
    let url = opt.url || "https://www.hkg.haokan333.com/201903/07/qM3F7ntN/800kb/hls/index.m3u8";
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
            throw new Error("哎呀，出错啦! 检查一下参数传对了没喔。", error);
        }
    })();

}

