import os from 'os'
const protocol = 'https:'
// const host = 'f0727.wonderfulday29.live'
const host = '0831.91p51.live'
const origin = protocol + '//' + host
const rootPath = '/Volumes/TOSHIBA_EXT/backups/SuperTime/Windows8/banana'
const query = {
    device: 'iPhone 7 13.4 1.0',
    s_device_id: '374B5729-7F3F-4C8F-B6DE-80FF0A333633',
    s_os_version: '13.4',
    s_platform: 'ios',
    _t: '1587401036000'
}
console.log('Hello', os.hostname())
const deployDir = (() => {
    let deployDir = 'dist_deploy'
    if (os.hostname() == 'zcdeMacBook-Air.local') {
        deployDir = '/Volumes/TOSHIBA_EXT/backups/SuperTime/Windows8/win11/91'
    } else if (os.hostname() == 'RT-N56U_B1') {
        deployDir = '/media/TOSHIBA_EXT/backups/SuperTime/Windows8/win11/91'
    }
    return deployDir
})()
console.log('Hello', deployDir)
const config = {
    protocol,
    host,
    origin,
    home: origin + '/index',
    query: () => ({ ...query, _t: new Date().valueOf(), s_device_id: query.s_device_id + '-' + new Date().valueOf() + '-' + Math.random().toString().slice(2, 8) }),
    // query: () => ({ ...query }),
    deployDir,
    dataSourceTxtName: deployDir + '/dataSourceNine.txt',
    videoPath: deployDir + '/video',
    imgPath: deployDir + '/imgage',
    line: 10,
    errorMax: 10000,
    bananaBomb: {
        id: '485e433c1e8b44184301535373a70955',
        key: '4fd8c4a1862cc2bbac1ccbc13c853dc8',
        secretKey: 'c0f4c3d922c68bdf',
        masterKey: 'e93dad270079c8d59658cc01d4fdbe0e'
    },
    testM3u8Url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    output: rootPath + '/v',
    logPath: rootPath + '/log',
    videoSuffix: '.mp4',
    extraName: '_tmp',
    maxProcess: 5,
    utils: {
        string2base64: function (str) {
            return new Buffer(str).toString('base64')
        },
        base642string: function (base6) {
            return new Buffer(base6, 'base64').toString()
        },
        string2hex: function (str) {
            return new Buffer(str, 'utf8').toString('hex')
        },
        hex2string: function (hex) {
            return new Buffer(hex, 'hex').toString('utf8')
        },
        isHexStr: function (str) {
            return /^[A-Fa-f0-9]{1,}$/.test(str)
        }
    }
}
export default config
// module.exports = config
