import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { deleteApi, postApi } from 'utils/browser/apiClient'

export const useStartScenario = (): {
  scenarioUrl: string
  startScenario: (ownerName?: string) => Promise<void>
} => {
  const { data: session } = useSession()
  const [url, setUrl] = useState('')

  const startScenario = useCallback(
    async (ownerName?: string) => {
      if (!session) {
        return
      }

      const { key } = await postApi('/api/scenario', {
        curriculumId: 'id',
        ownerName: ownerName || session.user.name,
        userName: session.user.name,
      })

      // このレスポンスでcookieにkeyが設定される
      setUrl(`${process.env.NEXT_PUBLIC_WETTYPROXY_URL}/shell?key=${key}`)
    },
    [session],
  )

  return {
    scenarioUrl: url,
    startScenario,
  }
}

export const useDeleteScenario = (): {
  deleteScenario: () => Promise<void>
} => {
  const { data: session } = useSession()

  const deleteScenario = useCallback(async () => {
    if (!session) {
      return
    }

    await deleteApi('/api/scenario', {
      curriculumId: 'id',
      userName: session.user.name,
    })
  }, [session])

  return { deleteScenario }
}
