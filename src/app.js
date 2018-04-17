import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import config from './config'

import MetaRoute from './routes/meta'
import QueueRoute from './routes/queue'

const app = new Koa()
app.use(cors())
app.use(
  bodyParser({
    enableTypes: ['json', 'form', 'text']
  })
)

app.use(async (ctx, next) => {
  let result
  try {
    result = await next()
  } catch (e) {
    console.error(e)
    result = {
      message: e.message
    }
    ctx.response.status = 500
  }
  if (!ctx.body) {
    ctx.response.type = 'application/json'
    const body = JSON.stringify(result)
    if (body === undefined) {
      ctx.body = 'null'
    } else {
      ctx.body = body
    }
  }
})

MetaRoute(app)
QueueRoute(app)

app.listen(config.server.port, () => {
  console.log(`Server listend at ${config.server.port}`)
})
