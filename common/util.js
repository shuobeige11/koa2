const path = require('path')

exports.getRegExp = str => {
    let regExp
    try {
      regExp = new RegExp(str)
    } catch (e) {
      regExp = /(?:)/
    }
    return regExp
}

exports.getQueryString = (obj, prefix = '') => {
    const str = Object.keys(obj)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&')
    return str ? `${prefix}${str}` : ''
  }
  
// 获取对应项目的temp目录  返回fn
exports.getTempFolder = application => {
  application = application || 'default'
  return path.resolve(__dirname, '..', application)
}

exports._toStr = arg => {
	if(arg === undefined){
		return undefined
	}
	return Object.prototype.toString.call(arg)
}
