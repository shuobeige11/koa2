const Promise = require('bluebird')
const fetch = require('node-fetch')


let dns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
    num = 0,
    wapCache = null,
    domain = null,
    param = null,
    query = null,
    urls = [],
    urlsCache = []

//获取每个页面的静态资源url
module.exports = async () => {
  const title = encodeURI('波多野结衣')
  let dns_arr = []
  dns = dns.replace(/(?=([A-Za-z0-9])){1}/g, ',')
  dns_arr = dns.split(',')
  dns_arr = [].slice.call(dns_arr)
  dns_arr = dns_arr.filter(data => data)
  let data = await fetchData(num, dns_arr, title)
}

async function fetchData(num, dns_arr, title) {
  if (num == 10) return urls
  let wap = Math.ceil(Math.random() * 4) + 1,
      domain = Math.ceil(Math.random() * 19) + 1,
      param = Math.ceil(Math.random() * 20)
      query = Math.ceil(Math.random() * 20),
      wap_name = collect(wap, dns_arr),
      domain_name = collect(domain, dns_arr),
      param_name = collect(param, dns_arr),
      query_name = collect(query, dns_arr),
      url = '',
      flag = false
  
  if (param_name && query_name) {
    url = `http://www.${domain_name}.com/${param_name}?${query_name}=${title}`
  } else if (param_name) {
    url = `http://www.${domain_name}.com/${param_name}/${title}`
  } else if (query_name) {
    url = `http://www.${domain_name}.com/?${query_name}=${title}`
  } else {
    url = `http://www.${domain_name}.com/${title}`
  }
  console.log(url)
  if (!urlsCache.length) urlsCache.push(url)
  for (let i = 0; i < urlsCache.length; i++) {
    if (url == urlsCache[i]) {
      flag = true
      break
    }
  }
  if (flag) fetchData(num, dns_arr, title)
  try {
    response = await fetch(url)
    let code = await response.status
    if (code !== 200) {
      fetchData(num, dns_arr, title)
    }
    num ++
    urls.push(url)
  } catch (e) {
    fetchData(num, dns_arr, title)
  }
}

function collect(num, dns_arr) {
  let name = ''
  for (let i = 0; i < num + 1; i++) {
    let code = Math.ceil(Math.random() * (dns_arr.length - 1))
    name += dns_arr[code]
  }
  return name
}