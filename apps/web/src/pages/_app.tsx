import type { AppProps } from 'next/app'
import { trpc } from 'utils/trpc'

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
