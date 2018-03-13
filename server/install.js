const { Mongodb } = require('./config')
const { sessStore } = require('./schema')
const db = Mongodb()
let data = Object.assign({}, { sid: '', sess: '', timeout: '', admin: '' })
// 创业 session collection
const sessModel = db.model('sessMode', sessStore)
let sessions = new sessModel(data)
sessions.save()
