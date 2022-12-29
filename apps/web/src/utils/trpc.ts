import { createTRPCNext } from '@trpc/next'
import { httpBatchLink } from '@trpc/client'
import { AppRouter } from 'server/routers/_app'

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    }
  },
})
