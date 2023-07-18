import { Box, Center, keyframes } from '@mantine/core'
import {
  Icon3dCubeSphere,
  Icon3dCubeSphereOff,
  IconBox,
  IconLoader,
} from '@tabler/icons-react'
import React, { FC, useState } from 'react'
import { _ActiveSandbox } from './_ActiveSandbox'
import { _ReadySandbox } from './_ReadySandbox'
import { SessionUser } from 'features/auth/types'
import { useSandboxValue } from 'features/sandbox/atoms'
import { ActiveSandbox, Sandbox } from 'features/sandbox/types'
import { useAppState } from 'foundation/appState'

const spin = keyframes({
  '0%': { transform: 'rotate(0)' },
  '100%': { transform: 'rotate(360deg)' },
})

const getUI = (
  status: Sandbox['status'],
): {
  bgColor: string
  icon: JSX.Element
  contents: (...args: any[]) => JSX.Element
} => {
  switch (status) {
    case 'active':
      return {
        bgColor: 'orange',
        icon: <IconBox color="#FFFFFF" size={'55%'} />,
        contents: (user: SessionUser, sandbox: ActiveSandbox) => (
          <_ActiveSandbox user={user} sandbox={sandbox} />
        ),
      }
    case 'ready':
      return {
        bgColor: 'orange',
        icon: <Icon3dCubeSphere color="#FFFFFF" size={'55%'} />,
        contents: (user: SessionUser) => <_ReadySandbox user={user} />,
      }
    case 'creating':
      return {
        bgColor: 'orange',
        icon: (
          <Center
            sx={{
              animation: `${spin} 3s linear infinite`,
            }}
          >
            <IconLoader
              color="white"
              size={'55%'}
              style={{
                animation: `${spin} 3s linear infinite`,
              }}
            />
          </Center>
        ),
        contents: () => <></>,
      }
    case 'deleting':
      return {
        bgColor: 'black',
        icon: (
          <Center
            sx={{
              animation: `${spin} 3s linear infinite`,
            }}
          >
            <IconLoader size={'55%'} />
          </Center>
        ),
        contents: () => <></>,
      }
    case 'inactive':
      return {
        bgColor: 'black',
        icon: <Icon3dCubeSphereOff size={'55%'} />,
        contents: () => <></>,
      }
    case 'error':
      return {
        bgColor: 'orange',
        icon: <Icon3dCubeSphereOff size={'55%'} />,
        contents: () => <></>,
      }
  }
}

type SandBoxProps = {
  user: SessionUser
}

export const SandBox: FC<SandBoxProps> = ({ user }) => {
  const sandbox = useSandboxValue()

  const [openNavber] = useAppState('openNavbar')
  const [expanding, setExpanding] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const ableToExpanding =
    ['active', 'ready'].includes(sandbox.status) && expanding

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
      onTransitionEnd={() => ableToExpanding && setIsExpanded(true)}
      sx={{
        zIndex: 500,
        position: 'fixed',
        bottom: 0,
        left: 0,
        borderRadius: 38,
        borderBottomLeftRadius: ableToExpanding ? 0 : 0,
        transitionDuration: '700ms',
        width: ableToExpanding ? 320 : openNavber ? 100 : 70,
        height: ableToExpanding ? 320 : openNavber ? 100 : 70,
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
            {getUI(sandbox.status).contents(user, sandbox)}
          </Box>
        ) : null}

        <Center
          sx={{
            position: 'absolute',
            opacity: ableToExpanding ? 0 : 1,
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
