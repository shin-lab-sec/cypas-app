import { Group, Button } from '@mantine/core'
import type { NextPage } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { useStartScenario, useDeleteScenario } from 'features/scenario/hooks'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const DashBoard: NextPage = () => {
  const { scenarioUrl, startScenario } = useStartScenario()
  const { deleteScenario } = useDeleteScenario()

  return (
    <DashBoardLayout>
      <div className="flex flex-col">
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

export default DashBoard
