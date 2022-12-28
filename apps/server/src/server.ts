import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import morgan from 'morgan'
import { z } from 'zod'

interface User {
  id: string
  name: string
}

const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
  },
]

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({})
type Context = inferAsyncReturnType<typeof createContext>
const t = initTRPC.context<Context>().create()
const appRouter = t.router({
  userById: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query((req) => {
      const input = req.input
      return userList.find((it) => it.id === input)
    }),

  userCreate: t.procedure.input(z.object({ name: z.string() })).mutation((req) => {
    const id = `${Math.random()}`
    const user: User = {
      id,
      name: req.input.name,
    }
    userList.push(user)
    return user
  }),
})

export type AppRouter = typeof appRouter

const port = 4000
const app = express()
app.use(morgan('combined'))
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)
app.listen(port, () => console.log(`started server on ${port} port, url: http://localhost:${port}`))
