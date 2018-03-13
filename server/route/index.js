const Router = require('koa-router');
const getToken = require('../middleware/token')

const router = new Router({
    prefix: '/api'
});
router.get('/', async (ctx) => {
  await ctx.render('../views/index.hbs', {
    title: 'im chart'
  });
})
//router.use((ctx, next) => getToken(ctx, next))

router.get('/test', ctx => {
  ctx.body = {
    code: 10000,
    message: '成功'
  }
})
module.exports = router