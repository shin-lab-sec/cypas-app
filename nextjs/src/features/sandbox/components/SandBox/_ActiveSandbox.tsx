import { Button, Flex } from '@mantine/core'
import React, { FC } from 'react'
import { SessionUser } from '../../../auth/types'
import { useDeleteSandbox, useOpenSandboxWindow } from 'features/sandbox/hooks'
import { ActiveSandbox } from 'features/sandbox/types'

type _ActiveSandboxProps = {
  user: SessionUser
  sandbox: ActiveSandbox
}

export const _ActiveSandbox: FC<_ActiveSandboxProps> = ({ user }) => {
  const { deleteSandbox } = useDeleteSandbox()
  const { openSandboxWindow } = useOpenSandboxWindow()

  return (
    <Flex gap={'lg'} direction={'column'} justify={'center'} h={'100%'}>
      <Button onClick={() => openSandboxWindow()}>サンドボックスへ</Button>
      <Button variant="filled" onClick={() => deleteSandbox(user)}>
        サンドボックスを削除
      </Button>
    </Flex>
  )
}
