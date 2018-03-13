const Promise = require('bluebird')

const draw = require('./draw')
// const zip = require('./zip')
const urlList = draw()
// module.exports = async (id, urls, globalUrls) => {
//   let metaList = []

//   if (!urls.length) return metaList

//   // 分析url

//   metaList = await collect(urlList, globalUrls, id)// 整理url
//   // 下载文件
//   metaList = await Promise.map(metaList, async item => {
//     let version = []
//     await Promise.map(item.files, async file => {
//         const obj = await download(file, item.name, item.hashname, item.filename, 9)
//         version.push(obj.hashcode)
//     })
//     version = version.sort().join('-')
//     return Object.assign(item, { version })
//   })

//   // 生成metaData文件
//   metaList = await Promise.map(metaList, async item => {
//      return await meta(item, id)
//   })

//   // 生成zip
//   metaList = await Promise.map(metaList, async item => {
//     let hashcode = await zip(item, id)
//     return Object.assign(item, { hashcode })
//   })
//   return metaList
// }