import { Box, Button, Center, Stack, Text } from '@mantine/core'
import {
  Icon3dCubeSphere,
  Icon3dCubeSphereOff,
  IconBox,
  IconLoader,
} from '@tabler/icons-react'
import React, { FC, useState } from 'react'
import { useSandboxValue } from 'features/sandbox/atoms'
import { Sandbox } from 'features/sandbox/types'
import { useAppState } from 'foundation/appState'

const getUI = (
  status: Sandbox['status'],
): {
  bgColor: string
  icon: JSX.Element
  contents?: JSX.Element
} => {
  switch (status) {
    case 'active':
      return {
        bgColor: 'orange',
        icon: <IconBox color="#FFFFFF" size={'55%'} />,
        contents: <IconBox size={40} />,
      }
    case 'ready':
      return {
        bgColor: 'orange',
        icon: <Icon3dCubeSphere color="#FFFFFF" size={'55%'} />,
        contents: (
          <Stack>
            <Text c={'white'}>サンドボックス</Text>
            <Text c={'white'}>色々起動時の情報</Text>
            <Button variant="filled">作成する</Button>
          </Stack>
        ),
      }
    case 'creating':
      return { bgColor: 'orange', icon: <IconLoader size={'55%'} /> }
    case 'deleting':
      return { bgColor: 'black', icon: <IconLoader size={'55%'} /> }
    case 'inactive':
      return { bgColor: 'black', icon: <Icon3dCubeSphereOff size={'55%'} /> }
    case 'error':
      return { bgColor: 'black', icon: <Icon3dCubeSphereOff size={'55%'} /> }
  }
}

type SandBoxProps = {}

export const SandBox: FC<SandBoxProps> = ({}) => {
  const sandbox = useSandboxValue()

  const [openNavber] = useAppState('openNavbar')
  const [expanding, setExpanding] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Box
      onMouseEnter={() => {
        const expandable = Boolean(getUI(sandbox.status).contents)
        setExpanding(expandable ? true : false)
      }}
      onMouseLeave={() => {
        setExpanding(false)
        setIsExpanded(false)
      }}
      onTransitionEnd={() => expanding && setIsExpanded(true)}
      sx={{
        zIndex: 500,
        position: 'fixed',
        bottom: 0,
        left: 0,
        borderRadius: 38,
        borderBottomLeftRadius: expanding ? 0 : 0,
        transitionDuration: '700ms',
        width: expanding ? 320 : openNavber ? 100 : 70,
        height: expanding ? 320 : openNavber ? 100 : 70,
        paddingBottom: openNavber ? 20 : 8,
        paddingLeft: openNavber ? 20 : 8,
      }}
    >
      <Center
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          border: '2px solid',
          borderColor: 'white',
          transitionDuration: '1000ms',
          backgroundColor: getUI(sandbox.status).bgColor,
          borderRadius: 999,
        }}
      >
        {isExpanded ? (
          <Box
            sx={{
              zIndex: 999,
              position: 'absolute',
              width: '100%',
              height: '100%',
              padding: 64,
            }}
          >
            {getUI(sandbox.status).contents}
          </Box>
        ) : null}

        <Center
          sx={{
            position: 'absolute',
            opacity: expanding ? 0 : 1,
            transition: '700ms',
            width: '100%',
            height: '100%',
            borderRadius: 999,
          }}
        >
          {getUI(sandbox.status).icon}
        </Center>
      </Center>
    </Box>
  )
}
