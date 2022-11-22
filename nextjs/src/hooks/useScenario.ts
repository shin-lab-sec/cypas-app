import { useCallback, useState } from 'react'
import { postApi } from 'utils/apiClient'

export const useStartScenario = (): {
  iframeSrc: string
  startScenario: (userId: string, userName: string) => Promise<void>
} => {
  const [url, setUrl] = useState('')

  const startScenario = useCallback(
    async (userId: string, userName: string) => {
      const { key } = await postApi('@server/scenario/start', {
        userId,
        userName,
      })

      // このレスポンスでcookieにkeyが設定される
      setUrl(`${process.env.NEXT_PUBLIC_WETTYPROXY_URL}/shell?key=${key}`)
      // iframeのリダイレクトがうまくできなかったのでここでリダイレクト
      // setTimeout(() => setUrl(`${process.env.NEXT_PUBLIC_WETTYPROXY_URL}`), 2000)
    },
    [],
  )

  return {
    iframeSrc: url,
    startScenario,
  }
}
