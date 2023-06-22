import { Box, Button, Stack, Text } from '@mantine/core'
import { IconBox } from '@tabler/icons-react'
import React, { FC, useState } from 'react'

type SandBoxProps = {}

export const SandBox: FC<SandBoxProps> = ({}) => {
  const [expanding, setExpanding] = useState(false)

  return (
    <Box
      onMouseEnter={() => setExpanding(true)}
      onMouseLeave={() => setExpanding(false)}
      sx={t => ({
        zIndex: 999,
        position: 'fixed',
        bottom: t.spacing.xs,
        left: t.spacing.xs,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: t.spacing.md,
        backgroundColor: 'orange',
        border: '2px solid',
        borderColor: 'white',
        borderRadius: 999,
        transitionDuration: '1000ms',
        width: 80,
        height: 80,

        ':hover': {
          width: 300,
          height: 300,
        },
      })}
    >
      {expanding ? (
        <Stack>
          <Text c={'white'}>サンドボックス</Text>
          <Text c={'white'}>色々起動時の情報</Text>
          <Button variant="filled">作成する</Button>
        </Stack>
      ) : (
        <IconBox size={50} color="white" />
      )}
    </Box>
  )
}
