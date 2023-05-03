import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {process.env.NEXT_PUBLIC_APP_ENV === 'dev' && (
        <div className="flex gap-4 py-2">
          <Link href={'/dev'} className="text-blue-700">
            dev
          </Link>
        </div>
      )}

      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
