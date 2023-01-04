import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { deleteApi, postApi } from 'utils/apiClient'

export const useStartScenario = (): {
  iframeSrc: string
  startScenario: () => Promise<void>
} => {
  const { data: session } = useSession()
  const [url, setUrl] = useState('')

  const startScenario = useCallback(async () => {
    if (!session) {
      return
    }

    const { key } = await postApi('/api/scenario', {
      userId: session.user.id,
      // TODO: nameをアカウント作成時に設定する。
      userName: '0xxx1111',
    })

    // このレスポンスでcookieにkeyが設定される
    setUrl(`${process.env.NEXT_PUBLIC_WETTYPROXY_URL}/shell?key=${key}`)
  }, [session])

  return {
    iframeSrc: url,
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
      userId: session?.user.id,
    })
  }, [session])

  return { deleteScenario }
}
