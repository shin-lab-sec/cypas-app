import 'foundation/styles/globals.css'
import { MantineProvider, createEmotionCache } from '@mantine/core'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

const appendCache = createEmotionCache({ key: 'mantine', prepend: false })

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={appendCache}
        theme={{
          colorScheme: 'dark',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}

export default MyApp
