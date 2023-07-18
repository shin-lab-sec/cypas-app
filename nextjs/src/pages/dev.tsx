import { Box, Button, Flex, Group, TextInput } from '@mantine/core'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useSandboxValue } from 'features/sandbox/atoms'
import {
  useReadySandbox,
  useStartSandbox,
  useDeleteSandbox,
  useSyncSandbox,
} from 'features/sandbox/hooks'
import { SandboxInfo } from 'features/sandbox/types'
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

  const [ownerName, setOwnerName] = useState('')

  const info: SandboxInfo = {
    ownerName,
    courseId: '',
    sectionId: '',
    userAgentType: 'terminal',
    userName: '',
  }
  const sandbox = useSandboxValue()
  useReadySandbox(info)
  const { startSandbox } = useStartSandbox()
  const { deleteSandbox } = useDeleteSandbox()
  const { syncSandbox } = useSyncSandbox()

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
                  const res = await postApi('/api/docker', {
                    command,
                  })
                  // const res = await getApi('/cms/courses')

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
                  await startSandbox(session.user, ownerName)
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
                  await deleteSandbox(session.user)
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

          {sandbox.status === 'active' ? (
            <Box mt={'md'} sx={{ flex: 1 }}>
              <a href={sandbox.sandboxUrl} target="_blank" rel="noreferrer">
                {sandbox.sandboxUrl}
              </a>
              <iframe
                title="terminal"
                src={''}
                // src={sandbox.sandboxUrl}
                style={{ width: '100%', height: '100%', borderRadius: 20 }}
              ></iframe>
            </Box>
          ) : null}
        </Box>
      </Flex>
    </div>
  )
}

export default Dev
