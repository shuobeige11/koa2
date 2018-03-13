const Promise = require('bluebird')
const mongoose = Promise.promisifyAll(require("mongoose"))

const sessStore = mongoose.Schema({
    sid: { type: String, default: ''},
    sess: { type: String, default: '', index: true},
    timeout: { type: Date, default: Date.now }
});

sessStore.statics.findSession = function(sess) {
  return new Promise((resolve, reject) => {
    this.find({ sess: sess.admin }, (err, data) => {
        if (err) reject(err)
        resolve(data)
    })  
  }).catch(err => {
      throw err
  })
}

sessStore.statics.updateSession = function(data, sess) {
  return new Promise((resolve, reject) => {
    this.update({ sess: sess.sess }, data, err => {
        if (err) reject(err)
        resolve('')
    })
  }).catch(err => {
      throw err
  })
}

module.exports = {
  sessStore
}
