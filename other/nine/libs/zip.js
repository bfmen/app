// 导入pako
import pako from 'pako'
// b64Data-->传入加密的数据进行解密
export function unzip(bufferData) {
    let str= bufferData.toString()
    let asdsa = stringToUint8Array(str)
    return bufferData ? pako.ungzip(stringToUint8Array(str), { to: 'string' }) : ''
}

// 加密
export function zip(str) {
    if (typeof str !== 'string') {
        str = JSON.stringify(str)
    }
    const binaryString = pako.gzip(str)
    return Uint8ArrayToString(binaryString)
}

// module.exports = {
//     unzip,
//     zip
// }

function Uint8ArrayToString(fileData) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString

}


function stringToUint8Array(str) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }

    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array
}