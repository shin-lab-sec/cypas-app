import { Box, Button, Flex } from '@mantine/core'
import React, { FC, useState } from 'react'
import { useSandboxValue } from 'features/sandbox/atoms'

type DevSandboxProps = {}

export const DevSandbox: FC<DevSandboxProps> = ({}) => {
  const sandbox = useSandboxValue()
  const [open, setOpen] = useState(true)
  return (
    <>
      {open ? (
        <Box
          sx={{
            zIndex: 999,
            position: 'fixed',
            top: 0,
            right: 0,
            padding: 10,
            backgroundColor: 'grey',
            maxWidth: 400,
          }}
        >
          <Flex justify={'end'}>
            <Button variant="outline" onClick={() => setOpen(false)}>
              閉じる
            </Button>
          </Flex>

          <pre>
            <code>{JSON.stringify(sandbox, null, 2)}</code>
          </pre>
        </Box>
      ) : (
        <Box
          sx={{
            zIndex: 999,
            position: 'fixed',
            top: 0,
            right: 0,
            padding: 10,
            backgroundColor: 'grey',
          }}
        >
          <Button onClick={() => setOpen(true)}>開く</Button>
        </Box>
      )}
    </>
  )
}
