import { Group, Button, Title } from '@mantine/core'
import type { NextPage } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import React from 'react'
import { getRoute } from '../foundation/routes'
import { useVerifiedSession } from 'features/auth/hooks'
import { useDeleteSandbox } from 'features/sandbox/hooks'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const Home: NextPage = () => {
  const { data: session } = useVerifiedSession()
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
          variant="outline"
          onClick={async () => {
            try {
              if (session) {
                await deleteSandbox(session.user)
              }
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
    </DashBoardLayout>
  )
}

export default Home
