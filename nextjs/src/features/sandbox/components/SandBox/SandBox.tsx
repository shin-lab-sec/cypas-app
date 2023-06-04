import { Box } from '@mantine/core'
import { Icon3dCubeSphereOff } from '@tabler/icons-react'
import React, { FC } from 'react'

type SandBoxProps = {}

export const SandBox: FC<SandBoxProps> = ({}) => {
  return (
    <Box
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
      <Icon3dCubeSphereOff size={50} color="white" />
    </Box>
  )
}
