import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {process.env.NEXT_PUBLIC_APP_ENV === 'dev' && (
        <div className="flex gap-4 py-2">
          <Link href={'/dev'}>
            <a className="text-blue-700">dev</a>
          </Link>
        </div>
      )}

      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
