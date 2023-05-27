// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth from 'next-auth'
import { SessionUser } from 'features/auth/types'

declare module 'next-auth' {
  interface Session {
    expires: ISODateString
    user: SessionUser
  }
}
