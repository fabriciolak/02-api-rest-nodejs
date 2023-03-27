import fastify from 'fastify'
import { env } from './env'

import cookieFastifyPlugin from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(cookieFastifyPlugin)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server running at http://localhost:3333`)
  })
