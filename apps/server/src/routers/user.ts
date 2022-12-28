import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export interface User {
  id: string
  name: string
}

const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
  },
]

export const userRouter = router({
  userById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query((req) => {
      const input = req.input
      return userList.find((it) => it.id === input)
    }),

  userCreate: publicProcedure.input(z.object({ name: z.string() })).mutation((req) => {
    const id = `${Math.random()}`
    const user: User = {
      id,
      name: req.input.name,
    }
    userList.push(user)
    return user
  }),
})
