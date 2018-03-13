/**
 * 项目入口文件
 */

const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const helmet = require('koa-helmet');
const views = require('koa-views');

const logger = require('../common/winstonLog');
const login = require('./route/login')
const router = require('./route');
const MongoStore = require('./schema/sess');
// const logger = require('./common/logger')
const { port } = require('./config');

const app = new Koa();

const http = require('http').Server(app.callback());
const io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

app.use(bodyParser());
app.use(views(path.resolve(__dirname, '../views'), {
  map: { hbs: 'handlebars' },
  default: 'hbs'
}))

// session
app.keys = ['I like use im'];
app.use(session({
  store: new MongoStore(),
  key: 'session.im',
  maxAge: 10000
}, app))


app.use(helmet());
//app.use(login.routes())
app.use(router.routes())


app.on('error', async (err, ctx) => {
  logger.log('error', 'server error', err)
  await ctx.throw(500, err)
});

app.listen(port, err => {
  if (err) {
    logger.log('error', 'server error', err)
  }
});
