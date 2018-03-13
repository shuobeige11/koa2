const base64 = require('base-64')

async function creatJwt(jwt, ips) {
  let code
  console.log(jwt)
  jwt = jwt.replace(/\B(?=[\d\w]){1}/g, ',')
  jwt = [].slice.apply(jwt)
  code = jwt.map(data => {
    data = data.charCodeAt(0)
    data = data + 40 - 15
    return data
  })
  code = code.map(data => {
    return String.fromCharCode(data)
  })
  return base64.encode(ips + code)
}

module.exports = {
    creatJwt
}