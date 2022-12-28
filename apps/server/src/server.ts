import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import morgan from 'morgan'
import { router } from './trpc'
import { userRouter } from './routers/user'

const appRouter = router({
  user: userRouter,
})

export type AppRouter = typeof appRouter

const port = 4000
const app = express()
app.use(morgan('combined'))
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
)
app.listen(port, () => {
  console.log(`started server on ${port} port, url: http://localhost:${port}`)
})
