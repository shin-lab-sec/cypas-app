import { Button } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'

const Home: NextPage = () => {
  const router = useRouter()
  const { status } = useSession()

  if (status === 'authenticated') {
    router.push('/dashboard')
    return <></>
  }

  return (
    <div>
      <Button onClick={() => signIn()}>sign in</Button>
    </div>
  )
}

export default Home
