import { Group, Button, Title } from '@mantine/core'
import type { NextPage } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import React from 'react'
import { getRoute } from '../foundation/routes'
import { useStartSandbox, useDeleteSandbox } from 'features/sandbox/hooks'
import { DashBoardLayout } from 'layouts/DashBoardLayout'
import { useSandboxValue } from 'features/sandbox/atoms'

const Home: NextPage = () => {
  const { sandboxUrl, startSandbox } = useStartSandbox()
  const { deleteSandbox } = useDeleteSandbox()

  return (
    <DashBoardLayout
      breadcrumbsList={[
        getRoute('/home'),
        getRoute('/courses'),
        getRoute('/courses/:id', { id: 'id', title: 'XSS初級' }),
      ]}
    >
      <Title size={'h3'}>サンドボックス</Title>
      <Group mt={'md'}>
        <Button
          onClick={async () => {
            try {
              await startSandbox()
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
          variant="outline"
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

      {/* <div>
        <iframe
          title="terminal"
          height={'100%'}
          width={'100%'}
          src={scenarioUrl}
        ></iframe>
      </div> */}
    </DashBoardLayout>
  )
}

export default Home
