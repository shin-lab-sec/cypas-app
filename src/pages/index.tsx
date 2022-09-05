import type { NextPage } from 'next'
import { useState } from 'react'
import { useStartTerminal } from 'hooks/useTerminal'
import { HttpError, postApi } from 'utils/api/api'

const Home: NextPage = () => {
  // docker
  const [command, setCommand] = useState('')
  const [res, setRes] = useState<any>()

  // terminal
  const [userId, setUserId] = useState('')
  const { iframeSrc, startTerminal } = useStartTerminal()
  return (
    <div className="h-screen bg-gray-100">
      <h1 className="pt-4 text-center text-4xl font-bold">開発用ページ</h1>
      <div className="mx-10 mt-10 flex h-[80%] justify-evenly gap-10">
        <div className="w-[50%] max-w-xl">
          <h2>docker コマンド</h2>
          <input
            className="w-[70%]"
            type="text"
            value={command}
            placeholder={'dockerの後の部分から入力'}
            onChange={e => setCommand(e.target.value)}
          />
          <button
            className="rounded-md bg-blue-400 p-1 text-white hover:opacity-75"
            onClick={async () => {
              try {
                const res = await postApi('/server/docker', {
                  command,
                })
                setRes(res)
              } catch (e) {
                if (e instanceof HttpError) {
                  setRes(e.statusText)
                }
              }
            }}
          >
            実行
          </button>
          <p>{JSON.stringify(res)}</p>
        </div>
        <div className="w-[50%] max-w-xl ">
          <h2>ターミナル</h2>
          <input
            className="mb-6 w-[70%]"
            type="text"
            value={userId}
            placeholder={'ユーザー名'}
            onChange={e => setUserId(e.target.value)}
          />
          <button
            className="rounded-md bg-blue-400 p-1 text-white hover:opacity-75"
            onClick={async () => {
              try {
                await startTerminal(userId)
              } catch (e) {
                if (e instanceof HttpError) {
                  console.log(e)
                }
              }
            }}
          >
            スタート
          </button>
          <button
            className="rounded-md bg-blue-400 p-1 text-white hover:opacity-75"
            onClick={async () => {
              try {
                await postApi('/server/terminal/delete', {
                  userId,
                })
              } catch (e) {
                if (e instanceof HttpError) {
                  console.log(e)
                }
              }
            }}
          >
            削除
          </button>

          {iframeSrc && (
            <iframe src={iframeSrc} width="100%" height="100%"></iframe>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
