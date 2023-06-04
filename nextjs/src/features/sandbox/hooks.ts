import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { deleteApi, postApi } from './../../foundation/utils/browser/apiClient'
import { useVerifiedSession } from './../auth/hooks'

export const useStartSandbox = (): {
  sandboxUrl: string
  startSandbox: (ownerName?: string) => Promise<void>
} => {
  const { data: session } = useVerifiedSession()
  const [url, setUrl] = useState('')

  const startSandbox = useCallback(
    async (ownerName?: string) => {
      if (!session) {
        return
      }

      const { key } = await postApi('/api/sandbox', {
        scenarioId: 'id',
        ownerName: ownerName || session.user?.name,
        userName: session.user?.name,
      })

      // このレスポンスでcookieにkeyが設定される
      setUrl(`${process.env.NEXT_PUBLIC_USERAGENT_URL}/sandbox?key=${key}`)
    },
    [session],
  )

  return {
    sandboxUrl: url,
    startSandbox,
  }
}

export const useDeleteSandbox = (): {
  deleteSandbox: () => Promise<void>
} => {
  const { data: session } = useVerifiedSession()

  const deleteSandbox = useCallback(async () => {
    if (!session) {
      return
    }

    await deleteApi('/api/sandbox', {
      scenarioId: 'id',
      userName: session.user?.name,
    })
  }, [session])

  return { deleteSandbox }
}
