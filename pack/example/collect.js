const md5 = require('md5')
const Promise = require('bluebird')
var shortid = require('shortid');

module.exports = async function (urlModules, globalUrls, id) {
  let metaList = [],
      metafiles = [],
      metafile = []
      fileList = collectFile(urlModules, globalUrls)
  
  /*
  metalist {
    name,
    hashName,
    files: metaData
  }
  metaData: {
        url,
        filename,
        hashcode,
        mime
    }
  */
  metafiles = fileList.map(obj => {
    metafile = obj.files.map(url => {
        return metadata(url)
    })

    return Object.assign({}, {
      name: obj.name,
      filename: `${id}_${shortid.generate()}`,
      hashname: md5name(obj.name, id),
      files: metafile
    })
  })

  metaList = metafiles.reduce((a, b) => a.concat(b), [])
 
  return metaList
}

function metadata(url) {
  let obj = {},
      text,
      mime
      
  obj.filename = shortid.generate()
  obj.url = url

  if(/\.css(\?.+)?$/.test(url)) {
        mime = 'text/css'
  } else if(/\.js(\?.+)?$/.test(url)) {
        mime = 'application/javascript'
  } else {
        mime = 'text/html'
  }

  obj.mime = mime
  return obj
}

const md5name = (name, id) => {
  let hashname = md5(name).substr(0, 8)
  return `${id}_${hashname}` 
}

//抽取各html中的公共js
const collectFile = (urlModules, globalUrls) => {
  let fileList = [],
      commonList = []
      
  commonList = urlModules.map(urlModule => urlModule.name)
            .filter(name => /\.(js|css)(\?.+)?$/.test(name) && !globalUrls.includes(name))

  fileList = urlModules.map(urlModule => urlModule.files)    
            .reduce((a, b) => a.concat(b), [])
            .sort()
  
  for (let i = 0; i < fileList.length - 1; i++) {
     if (fileList[i] === fileList[i + 1] && !commonList.includes(fileList[i]) && /\.(js|css)(\?.+)?$/.test(fileList[i]) && !globalUrls.includes(fileList[i])) {
        commonList.push(fileList[i])
     }
  }
  urlModules = urlModules.filter(urlModule => !/\.(js|css)(\?.+)?$/.test(urlModule.name))
              .map(urlModule => {
                fileList = urlModule.files && urlModule.files.filter(url => !globalUrls.includes(url) && !commonList.includes(url))
                return Object.assign(urlModule, { files: fileList })
              })
  
  urlModules.unshift({name: 'common', files: commonList})
  return urlModules
}