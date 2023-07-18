import { Button, Stack } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import React, { FC } from 'react'
import { SessionUser } from '../../../auth/types'
import { useDeleteSandbox } from 'features/sandbox/hooks'
import { ActiveSandbox } from 'features/sandbox/types'

type _ActiveSandboxProps = {
  user: SessionUser
  sandbox: ActiveSandbox
}

export const _ActiveSandbox: FC<_ActiveSandboxProps> = ({ user, sandbox }) => {
  const { deleteSandbox } = useDeleteSandbox()

  return (
    <Stack>
      <Button
        component="a"
        href={sandbox.sandboxUrl}
        rightIcon={<IconExternalLink />}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Go Sandbox!
      </Button>
      <Button onClick={() => deleteSandbox(user)}>Delete Sandbox</Button>
    </Stack>
  )
}
