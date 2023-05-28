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
          primaryColor: 'teal',
          colorScheme: 'dark',
          fontFamily: 'Noto Sans JP,sans-serif',
          fontFamilyMonospace: 'Monaco, Courier, monospace',
          headings: { fontFamily: 'Noto Sans JP,sans-serif' },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}

export default MyApp
