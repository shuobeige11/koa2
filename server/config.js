const mongoose = require('mongoose');
const link = 'mongodb://127.0.0.1:27017/im'

const logger = require('../common/winstonLog');

const isProduction = process.env.NODE_ENV

//端口设置
function port() {
    return isProduction ? process.port : 3000
}

function Mongodb() {
    const options = {  
      server: {
        auto_reconnect: true,
        poolSize: 25
      }
    }
    
    return mongoose.createConnection(link, options, (err, res) => {  
      if (err) {
        logger.error(`[mongoose log] Error connecting to: ${link} . ${err}`)
      }
    })
}

module.exports = {
  port: port(),
  isProduction,
  Mongodb
}