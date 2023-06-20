import { Box, Button, Flex, Group, TextInput } from '@mantine/core'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useStartSandbox, useDeleteSandbox } from 'features/sandbox/hooks'
import { getApi, postApi } from 'foundation/utils/browser/apiClient'
import { ApiError } from 'foundation/utils/fetchApi'

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

  const { sandboxUrl, startSandbox } = useStartSandbox()
  const { deleteSandbox } = useDeleteSandbox()

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
      <Flex gap={'lg'} h={'80%'} justify={'space-evenly'} px={'lg'}>
        <Box w={'50%'}>
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
                  // const res = await postApi('/api/docker', {
                  //   command,
                  // })
                  const res = await getApi('/cms/useragents')
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
        </Box>

        <Box w={'50%'}>
          <h2>サンドボックス</h2>
          <Group>
            <Button
              onClick={async () => {
                try {
                  await startSandbox(ownerName)
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
                  await deleteSandbox()
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
            <a href={sandboxUrl} target="_blank" rel="noreferrer">
              {sandboxUrl}
            </a>
            <iframe
              className="mt-2 h-80 rounded-md bg-white"
              title="terminal"
              height={'100%'}
              width={'100%'}
              src={sandboxUrl}
            ></iframe>
          </div>
        </Box>
      </Flex>
    </div>
  )
}

export default Dev
