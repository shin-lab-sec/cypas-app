import { Button, Flex, Group, TextInput } from '@mantine/core'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useDeleteScenario, useStartScenario } from 'features/scenario/hooks'
import { postApi } from 'utils/browser/apiClient'
import { ApiError } from 'utils/fetchApi'

//開発用のページ。開発環境のみ見ることができる。
export const getServerSideProps: GetServerSideProps = async () => {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'dev') {
    return { props: {} }
  }
  return {
    redirect: {
      permanent: true,
      destination: '/',
    },
  }
}

const Dev: NextPage = () => {
  const { data: session, status } = useSession()

  // docker
  const [command, setCommand] = useState('')
  const [res, setRes] = useState<any>()

  const { scenarioUrl, startScenario } = useStartScenario()
  const { deleteScenario } = useDeleteScenario()

  const [ownerName, setOwnerName] = useState('')

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
    <div className="h-screen">
      <Button size="sm" onClick={() => signOut()}>
        sign out
      </Button>
      <div>name: {session.user.name}</div>
      <div>email: {session.user.email}</div>

      <h1 className="pt-4 text-center text-4xl font-bold">開発用ページ</h1>
      <div className="mx-10 mt-10 flex h-[80%] justify-evenly gap-10">
        <div className="w-[50%] max-w-xl">
          <h2>docker コマンド</h2>
          <Flex>
            <TextInput
              className="w-[70%]"
              type="text"
              value={command}
              placeholder={'dockerの後の部分から入力'}
              onChange={e => setCommand(e.target.value)}
            />
            <Button
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
            </Button>
          </Flex>
          <pre>
            <code>{JSON.stringify(res, null, 2)}</code>
          </pre>
        </div>

        <div className="flex w-[50%] max-w-xl flex-col">
          <h2>シナリオ</h2>
          <Group>
            <Button
              onClick={async () => {
                try {
                  await startScenario(ownerName)
                } catch (e) {
                  if (e instanceof ApiError) {
                    console.log(e)
                  }
                }
              }}
            >
              スタート
            </Button>
            <Button
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
            </Button>
          </Group>

          <TextInput
            mt="lg"
            type="text"
            value={ownerName}
            placeholder={'オーナー名'}
            onChange={e => setOwnerName(e.target.value)}
          />

          <div className="mt-2 flex-1">
            <a href={scenarioUrl} target="_blank" rel="noreferrer">
              {scenarioUrl}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dev
