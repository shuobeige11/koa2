const path = require('path')
const fse = require('fs-extra')
const md5 = require('md5')
const fetch = require('node-fetch')

const { getTempFolder } = require('../../common/util')

const pagesTempFolder = getTempFolder('cache')

async function download(obj, name, hashname, filename, id) {
  //console.log(filename)
  let response = await fetch(obj.url)
  let code = await response.status
  if (code !== 200) throw new Error(`${obj.url}:${code}`)
  let text = await response.text()

  let hashcode = md5(text)//生成文件hashcode
  let filePath = path.join(pagesTempFolder, 'pages', filename, obj.filename)

  await fse.outputFile(filePath, text)
  return Object.assign(obj, { hashcode })
} 

async function meta(obj, id) {
  let name = obj.filename
  let version = `${id}_${md5(obj.version).substr(0, 8)}`
  let text = JSON.stringify(obj.files)
  let filePath = path.join(pagesTempFolder, 'pages', name, 'metadata')
  await fse.outputFile(filePath, text)
  return {
    url: obj.name,
    name: obj.hashname,
    filename: obj.filename,
    version
  }
} 


module.exports = {
  download,
  meta
}