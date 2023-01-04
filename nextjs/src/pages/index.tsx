import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useDeleteScenario, useStartScenario } from 'hooks/useScenario'
import { ApiError, postApi } from 'utils/apiClient'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  // docker
  const [command, setCommand] = useState('')
  const [res, setRes] = useState<any>()

  const { iframeSrc, startScenario } = useStartScenario()
  const { deleteScenario } = useDeleteScenario()

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
                const res = await postApi('/api/docker', {
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
        <div className="flex w-[50%] max-w-xl flex-col">
          <div className="flex">
            <h2>ターミナル</h2>
            <button
              className="ml-4 rounded-md bg-blue-400 p-1 text-white hover:opacity-75"
              onClick={async () => {
                try {
                  await startScenario()
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
                  await deleteScenario()
                } catch (e) {
                  if (e instanceof ApiError) {
                    console.log(e)
                  }
                }
              }}
            >
              削除
            </button>
          </div>

          <div className="mt-2 flex-1">
            {/* {iframeSrc && (
              <iframe src={iframeSrc} width="100%" height="100%"></iframe>
            )} */}
            <a href={iframeSrc} target="_blank" rel="noreferrer">
              {iframeSrc}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
