import { useSession } from 'next-auth/react'

export const useVerifiedSession = () => {
  const session = useSession({ required: true })

  return session
}
