const Koa = require('koa')
var KoaRouter = require('koa-router')  /*引入是实例化路由** 推荐*/
const app = new Koa()

const apiRouter = KoaRouter()

const mid = () => {
  function render(json) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify(json)
  }

  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}

app.use(mid())
let i = 0
apiRouter.get('/user/list', async ctx => {
  console.log('request -- ', i++)
  var waitUntil = new Date(new Date().getTime() + 1000);
  while(waitUntil > new Date()){}
  ctx.send(
    {
      message: 'ok',
      data: [
        { id: 111, name: 'tom', age: 18 },
        { id: 222, name: 'jerry', age: 20 }
      ]
    }
  )
})

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

app.listen(3000, () => {
  console.log('server start http://localhost:3000')
})
