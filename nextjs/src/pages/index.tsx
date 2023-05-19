import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'unauthenticated' || !session) {
    return (
      <button
        className="rounded-md border border-black p-1"
        onClick={() => signIn()}
      >
        sign in
      </button>
    )
  }
  return (
    <DashBoardLayout>
      <div>
        <button
          className="rounded-md border border-black p-1"
          onClick={() => signOut()}
        >
          sign out
        </button>
        <div>user: {session.user.email}</div>
      </div>
    </DashBoardLayout>
  )
}

export default Home
