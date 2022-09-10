import { useCallback, useState } from 'react'
import { postApi } from 'utils/api/api'

export const useStartTerminal = (): {
  iframeSrc: string
  startTerminal: (userId: string) => Promise<void>
} => {
  const [url, setUrl] = useState('')

  const startTerminal = useCallback(async (userId: string) => {
    const { key } = await postApi('@server/terminal/start', {
      userId,
    })

    // このレスポンスでcookieにkeyが設定される
    setUrl(`${process.env.NEXT_PUBLIC_WETTYPROXY_URL}/shell?key=${key}`)
    // iframeのリダイレクトがうまくできなかったのでここでリダイレクト
    setTimeout(() => setUrl(`${process.env.NEXT_PUBLIC_WETTYPROXY_URL}`), 2000)
  }, [])

  return {
    iframeSrc: url,
    startTerminal,
  }
}
