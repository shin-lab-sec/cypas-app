import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { DevSandbox } from 'features/sandbox/components/DevSandbox'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            primaryColor: 'teal',
            colorScheme: 'dark',
            fontFamily: 'Noto Sans JP,sans-serif',
            fontFamilyMonospace: 'Monaco, Courier, monospace',
            headings: { fontFamily: 'Noto Sans JP,sans-serif' },
          }}
        >
          <DevSandbox />
          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </RecoilRoot>
  )
}

export default MyApp
