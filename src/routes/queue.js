// eslint-disable-next-line
import Koa from 'koa'
import Route from 'koa-route'
import config from '../config'
import {
  fetchStoreUpdateQueue,
  removeFromStoreUpdateQueue
} from '../models/queue'
import _ from 'lodash'
import crypto from 'crypto'

/**
 * queue route
 * this route is protected by token-based auth
 * @param {Koa} app koa app
 */
export default function(app) {
  app.use(
    Route.get('/queue', async ctx => {
      authRequired(ctx)
      const result = await fetchStoreUpdateQueue(ctx.query.type)
      return result
    })
  )
  app.use(
    Route.delete('/queue', ctx => {
      authRequired(ctx)
      const idTypeList = ctx.body.idTypeList
      if (!idTypeList || _.isArray(idTypeList)) {
        throw new Error('no idTypeList')
      }
      for (const d of idTypeList) {
        if (!d.id || !d.type) {
          throw new Error('invalid idtype found')
        }
      }
      return removeFromStoreUpdateQueue(idTypeList)
    })
  )
}

const tokenBuffer = Buffer.from(config.auth.token)

function authRequired(ctx) {
  if (
    !ctx.request.header.token ||
    ctx.request.header.token.length !== config.auth.token.length
  ) {
    throw new Error('Unauthorized')
  }
  if (
    !crypto.timingSafeEqual(Buffer.from(ctx.request.header.token), tokenBuffer)
  ) {
    throw new Error('Unauthorized')
  }
}
