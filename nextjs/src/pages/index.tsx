import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'

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
    <div className="h-screen bg-gray-100">
      <button
        className="rounded-md border border-black p-1"
        onClick={() => signOut()}
      >
        sign out
      </button>
      <div>user: {session.user.email}</div>
    </div>
  )
}

export default Home
