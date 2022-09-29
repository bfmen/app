import cheerio from 'cheerio'
import pako from 'pako'
import fs from 'fs'
let utils = {
  format: {
    all: function (data) {
      const $ = cheerio.load(data);
      return { ...this.title(data), ...this.listV(data), ...this.submenu(data), ...this.detail(data) }
    },
    detail(data) {
      let detail = {}
      try {
        let strencode = decodeURIComponent(data.split('strencode2(')[1].split(')')[0].replace(/\"/g, ''))
        detail.src = cheerio.load(strencode)('source')[0].attribs.src
      } catch (error) { }
      const $ = cheerio.load(data);
      return { detail }
    },
    submenu(data) {
      let submenu = []
      const $ = cheerio.load(data)
      submenu = [...$('.submenu a')].map(el => {
        let href = el.attribs.href
        let title = cheerio.load(el).text()
        return { href, title }
      })
      let totalpage = 0
      try {
        totalpage = [...$('.pagingnav a')].map(item => Number(cheerio.load(item).text())).filter(item => !isNaN(item)).sort((a, b) => b - a)[0]
      } catch (error) { }
      return { submenu, totalpage }
    },
    listV(data) {
      let listV = []
      const $ = cheerio.load(data)
      let row = $('.row .row .well');
      listV = [...row].map(element => {
        let $ = cheerio.load(element)
        let a = $('a')
        let span = $('span.info')
        let trans = {
          '添加时间': 'Added',
          '作者': 'From',
          '查看': 'Views',
          '收藏': 'Favorites',
          '留言': 'Comments',
          '积分': 'Point',
        }
        let obj = [...span].map(el => {
          let text = el.next && el.next.data.trim().replace(/ /g, '')
          return cheerio.load(el).text() + text
        }).reduce((item, str) => {
          let arr = str.split(':')
          item[trans[arr[0]] || arr[0]] = arr[1]
          return item
        }, {})
        // obj = { obj }
        obj.href = a[0].attribs.href
        obj.img = a.find('.img-responsive')[0].attribs.src
        obj.duration = a.find('.duration').text()
        obj.original = a.find('.original-text-icon').text()
        obj.hd = a.find('.hd-text-icon').text()
        obj.title = a.find('.video-title').text()
        obj.title = html_decode(obj.title)
        obj.viewkey = obj.href.split('?viewkey=')[1].split('&')[0]
        return obj
      })
      return { listV }
    },
    title: function (data) {
      const $ = cheerio.load(data);
      let title = $("title").text().trim();
      return { title }
    }
  },
  file: {
    mkdir: (path) => {
      fs.mkdirSync(path, { recursive: true }, () => { })
    },
    getDataSource: async (name) => {
      return await new Promise((resolve, reject) => {
        fs.readFile(name, function (err, data) {
          try {
            resolve(JSON.parse(data ? unzip(data) : '{}'))
          } catch (error) {
            console.error('getDataSource error', error)
            resolve({})
          }
        });
      })
    },
    saveDataSource: async (dataSourceTxtName, dataSource) => {
      let dataSourceStr = zip(dataSource)
      // dataSourceStr = utils.trans.string2hex(dataSourceStr)
      // dataSourceStr =  JSON.stringify(dataSource)
      return await new Promise((resolve, reject) => {
        fs.writeFile(dataSourceTxtName, dataSourceStr, (err) => {
          if (err) {
            console.log('写入错误', err);
            reject(err)
          }
          console.log("写入成功", Object.keys(dataSource).length, '压缩比例', dataSourceStr.length / JSON.stringify(dataSource).length)
          resolve()
        })
      })
    },
  },
  trans: {
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


function formatNumber(str) {
  let arr = [{ key: 'B', pow: 9 }, { key: 'M', pow: 6 }, { key: 'K', pow: 3 }]
  let item = arr.find(item => str.endsWith(item.key))
  if (item) {
    str = parseFloat(str.replaceAll(item.key, '')) * Math.pow(10, item.pow) || 0
  }
  return parseInt(str)
}


const replaceAttribute = (html) => {
  var converter = document.createElement("DIV");
  converter.innerHTML = html;
  var text = converter.innerText;
  return text
}


function html_decode(str) {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, "\"");
  s = s.replace(/<br\/>/g, "\n");
  return s;
}

export function unzip(bufferData) {
  let str = bufferData.toString()
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


export default utils
// module.exports = utils