const { Mongodb } = require('../config')
const { sessStore } = require('./index')
const db = Mongodb()
const sessModel = db.model('sessMode', sessStore)

class MongStore {
    async get(sess) {
      let token = await sessModel.findSession(sess)
      return token
    }

    async set(sid, sess, maxAge) {
      let data = Object.assign({}, { sid, sess: sess.sess, timeout: maxAge, admin: sess.admin })
      let exist = await sessModel.findSession(sess)
      if (exist.length) {
        await sessModel.updateSession(sess, data)
        return
      }
      let db = new sessModel(data)
      db.save()
    }
    
    async destroy(value) {
      console.log(3)
      sessModel.deleteOne({ sess: value })
    }
}

module.exports = MongStore