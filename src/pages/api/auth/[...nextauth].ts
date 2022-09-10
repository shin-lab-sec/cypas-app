import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import prisma from 'libs/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER || '',
      from: process.env.EMAIL_FROM || '',
    }),
  ],
  secret: 'secret',
  callbacks: {
    session: async ({ session, user }) => {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      })
    },
  },
})
