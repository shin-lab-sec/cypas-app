import { Group, Button } from '@mantine/core'
import type { NextPage } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import React from 'react'
import { getRoute } from '../foundation/routes'
import { useStartScenario, useDeleteScenario } from 'features/scenario/hooks'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const Home: NextPage = () => {
  const { scenarioUrl, startScenario } = useStartScenario()
  const { deleteScenario } = useDeleteScenario()

  return (
    <DashBoardLayout
      breadcrumbsList={[
        getRoute('/home'),
        getRoute('/courses'),
        getRoute('/courses/:id', { id: 'id', title: 'XSS初級' }),
      ]}
    >
      <div className="mt-[800px] flex flex-col">
        <h2>シナリオ</h2>
        <Group>
          <Button
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

        <iframe
          className="mt-2 h-80 rounded-md"
          title="terminal"
          height={'100%'}
          width={'100%'}
          src={scenarioUrl}
        ></iframe>
      </div>
    </DashBoardLayout>
  )
}

export default Home
