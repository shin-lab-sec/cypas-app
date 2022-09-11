import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useStartTerminal } from 'hooks/useTerminal'
import { ApiError, postApi } from 'utils/apiClient'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  // docker
  const [command, setCommand] = useState('')
  const [res, setRes] = useState<any>()

  const { iframeSrc, startTerminal } = useStartTerminal()

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
                const res = await postApi('@server/docker', {
                  command,
                })
                setRes(res)
              } catch (e) {
                if (e instanceof ApiError) {
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
          <button
            className="rounded-md bg-blue-400 p-1 text-white hover:opacity-75"
            onClick={async () => {
              try {
                await startTerminal(session.user.id)
              } catch (e) {
                if (e instanceof ApiError) {
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
                await postApi('@server/terminal/delete', {
                  userId: session.user.id,
                })
              } catch (e) {
                if (e instanceof ApiError) {
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
