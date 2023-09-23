import { Button, Center, Flex, Text } from '@mantine/core'
import React, { FC } from 'react'
import { SessionUser } from '../../../auth/types'
import { useOpenSandboxWindow, useStartSandbox } from '../../../sandbox/hooks'
import { ReadySandbox } from 'features/sandbox/types'

type _ReadySandboxProps = {
  user: SessionUser
  sandbox: ReadySandbox
}

export const _ReadySandbox: FC<_ReadySandboxProps> = ({ user, sandbox }) => {
  const { startSandbox } = useStartSandbox()
  const { openSandboxWindow } = useOpenSandboxWindow()

  return (
    <Flex direction={'column'} h={'100%'}>
      <Text c={'white'}>
        コース：
        <br />
        {sandbox.courseName}
      </Text>
      <Text c={'white'} mt={'sm'}>
        種類：
        <br />
        {sandbox.userAgentType === 'vdi' && '仮想デスクトップ型'}
        {sandbox.userAgentType === 'terminal' && 'ターミナル型'}
      </Text>
      <Center
        sx={{
          flexGrow: 1,
          alignItems: 'end',
        }}
      >
        <Button
          variant="filled"
          onClick={async () => {
            await startSandbox(user)
            await openSandboxWindow()
          }}
        >
          起動する
        </Button>
      </Center>
    </Flex>
  )
}
