import { Button, Stack, Text } from '@mantine/core'
import React, { FC } from 'react'
import { SessionUser } from '../../../auth/types'
import { useStartSandbox } from '../../../sandbox/hooks'

type _ReadySandboxProps = {
  user: SessionUser
}

export const _ReadySandbox: FC<_ReadySandboxProps> = ({ user }) => {
  const { startSandbox } = useStartSandbox()

  return (
    <Stack>
      <Text c={'white'}>サンドボックス</Text>
      <Text c={'white'}>色々起動時の情報</Text>
      <Button variant="filled" onClick={async () => await startSandbox(user)}>
        作成する
      </Button>
    </Stack>
  )
}
