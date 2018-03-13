module.exports = (ctx, next) => {
  const token = ctx.cookies.get('token')
  if (!token) {
    ctx.body = {
      code: 1024,
      message: '未登录'
    }
    return
  }
  

  return next()
}