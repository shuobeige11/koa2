const Router = require('koa-router');
const { creatJwt } = require('../controller/admin')

const router = new Router();

router.get('/login', async ctx => {
    const username = ctx.query.username
    const pwd = ctx.query.password
    const dt = ctx.query.dt

    console.log(ip)
    // ip = ip.match(/\d+\./g)
    // ip.forEach(data => {
    //   ips += data
    // })
    
    if (username === '' || pwd === '') {
      return ctx.body = {
        code: 0,
        data: {},
        msg: '用户名或密码不能为空！'
      }
    }
  
    //let token = await creatJwt(dt, ips)
   
    ctx.session.sess = token
    ctx.session.admin = 'admin'
    ctx.cookies.set('token', token, {})
    ctx.body = {
      title : 'User Test!',
      username: 'admin'
    };
  })

  module.exports = router