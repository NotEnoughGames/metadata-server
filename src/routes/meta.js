// eslint-disable-next-line
import Koa from 'koa'
import Route from 'koa-route'
import { getSingleAppById, getAppsByIds } from '../models/app'

/**
 * meta route
 * @param {Koa} app koa app
 */
export default function(app) {
  app.use(
    Route.get('/app/:appId', (ctx, appId) => {
      // 尽管我们设置了一周的缓存，但由于 CORS 的存在，Vary 头被设置为了 Origin。
      // 这意味着不同的 Origin 会有不同的缓存。
      ctx.response.set('Cache-Control', `public, max-age=${60 * 60 * 24 * 7}`)
      return getSingleAppById(appId)
    })
  )
  app.use(
    Route.post('/apps', ctx => {
      if (!ctx.request.body) {
        throw new Error('no body')
      }
      if (ctx.request.body.length > 100000) {
        throw new Error('body too long')
      }
      const appIds = ('' + ctx.request.body)
        .split(',')
        .map(s => parseInt(s))
        .filter(s => !isNaN(s))
        .filter(s => s < 1e8 && s > 0)
      if (appIds.length > 100) {
        throw new Error('length <= 100 please')
      }
      return getAppsByIds(appIds)
    })
  )
}
