const fetch = require('node-fetch');
const path = require('path');
const fse = require('fs-extra')
const xlsx = require('node-xlsx');

const spawn = require('child_process').spawn;

const { getTempFolder, _toStr } = require('../common/util')
const pagesTempFolder = getTempFolder('download')

const filePath = path.join(pagesTempFolder, '', '', 'a.xlsx')
const outePath = path.join(pagesTempFolder, '', '', 'b.xlsx')
const url = 'http://www.ip138.com:8080/search.asp?'

const obj = xlsx.parse(filePath);
let data = obj[0].data,
    countArr = obj[0].data,
    first = data[0],
    cacheArr = [],
    num = 0
if (fse.existsSync(outePath)) {
    let outfile = xlsx.parse(outePath)
    outfile = outfile[0].data
    num = Math.floor(outfile.length / 10)

    let start = +new Date()
}

let count = Math.floor((countArr.length - 1) / 10),
    surplus = countArr.length - count * 10,
    end = num < count ?  10 : surplus

countArr.shift();
async function draw(index, data, end) {
  try {
    let cache = []
    for (let i = index; i < index + end; i++) {
        let t = data[i][0].toString()
        cache.push([t])
    }
    cache = cache.map(async value => {
      let cache_data = await request(value)
      return cache_data
    })
    
    return cache
  } catch (err) {
    throw err
  }
}

async function request(data) {
  try { 
    let res = await fetch(`${url}action=mobile&mobile=${data[0]}`)
    let text = await res.text()
    if (!text) return request(data)
    let str = []
    let src
    let pattern = /\<TD.*\>(.*)\<\/TD\>/gi
    
    while (src = pattern.exec(text))
     str.push(src[1])

    str = str[3] ? str[3] : str[5] ? str[5] : '' 
    return str ? data.concat([].slice.call(str.split(/\&nbsp;/))) : ''
    
  } catch (err) {
    throw err
  }
}

async function ready(num) {
  try {
    if (num <= count) {
        let cache = await draw(num * 10, countArr, end);
        cacheArr = cacheArr.concat(cache)
        outfile = []
        Promise.all(cacheArr).then(data => {
          if (fse.existsSync(outePath)) {
            outfile = xlsx.parse(outePath)
            outfile = outfile[0].data
            outfile = outfile.concat(data)
          } else {
            outfile = data
            outfile.unshift(first)
          }
          let str = xlsx.build([{
            name: 'sheet1',
            data: outfile
          }]);
          fse.outputFile(outePath, str)
          let ls = spawn('node',['excel.js', path.join(__dirname, '/')])
        })
    } else {
      let endTime = +new Date()
      console.log(start - endTime)
      ls.kill('SIGHUP')
    }
  } catch (e) {
    throw e
  }
}

ready(num)
