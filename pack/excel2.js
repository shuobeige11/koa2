const fetch = require('node-fetch');
const path = require('path');
const fse = require('fs-extra')
const xlsx = require('node-xlsx');
const events = require('events');
const eventEmitter = new events.EventEmitter()
eventEmitter.setMaxListeners(3000)
const { getTempFolder, _toStr } = require('../common/util')
const pagesTempFolder = getTempFolder('download')

const filePath = path.join(pagesTempFolder, '', '', 'a.xlsx')
const outePath = path.join(pagesTempFolder, '', '', 'b.xlsx')
const url = 'http://www.ip138.com:8080/search.asp?'

const obj = xlsx.parse(filePath);
let data = obj[0].data,
    countArr = obj[0].data,
    cacheArr = [],
    num = 0

countArr.shift();
async function draw() {
  try {
    let cache = []
    for (let i = 1; i < data.length; i++) {
        let t = data[i][0].toString()
        cache.push([t])
    }
    cache.forEach(async value => {
      let citys = await createEvent(value)
      if (citys) {
        cacheArr.push(citys)
      }
      // let str = await xlsx.build([{
      //   name: 'sheet1',
      //   data: cacheArr
      // }]);
      // fse.outputFile(outePath, str)
    })
    
    eventEmitter.emit('subscribe')
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
    request(data)
  }
}


function createEvent(value) {
  return new Promise((resolve, reject) => {
    eventEmitter.on('subscribe', async () => {
        let cache_data = await request(value)
        resolve(cache_data)
    });
  })
}

async function ready() {
  let cache = draw()
  // let d = await cache[0]
  // console.log(d)
}

ready()