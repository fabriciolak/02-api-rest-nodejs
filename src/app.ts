import fastify from 'fastify'
import cookieFastifyPlugin from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookieFastifyPlugin)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
