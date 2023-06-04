import { Navbar, ActionIcon, Box } from '@mantine/core'
import {
  Icon3dCubeSphereOff,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'
import React, { FC } from 'react'
import {
  HEADER_HEIGHT,
  NAVBAR_WIDTH,
  NAVBAR_WIDTH_NARROWED,
} from './DashBoardLayout'
import { _NavLinks } from './_NavLinks'
import { _User } from './_User'
import { SessionUser } from 'features/auth/types'

type _NavbarProps = {
  currentNavTitle: string
  user: Pick<SessionUser, 'name' | 'email'>
  openNavbar: boolean
  onToggleNavber: () => void
}

export const _Navbar: FC<_NavbarProps> = ({
  currentNavTitle,
  user,
  openNavbar,
  onToggleNavber,
}) => {
  return (
    <Navbar
      p={'xs'}
      width={{ base: openNavbar ? NAVBAR_WIDTH : NAVBAR_WIDTH_NARROWED }}
      mih={`calc(100vh - ${HEADER_HEIGHT})`}
      sx={{
        overflow: 'hidden',
        transitionDuration: '300ms',
        width: `${openNavbar ? NAVBAR_WIDTH : NAVBAR_WIDTH_NARROWED}px`,
      }}
    >
      <Navbar.Section>
        <ActionIcon onClick={onToggleNavber} ml={'sm'}>
          {openNavbar ? (
            <IconChevronsLeft color="#C1C2C5" size="1.125rem" />
          ) : (
            <IconChevronsRight color="#C1C2C5" size="1.125rem" />
          )}
        </ActionIcon>
      </Navbar.Section>

      <Navbar.Section grow mt={'xs'}>
        <_NavLinks currentNavTitle={currentNavTitle} compact={!openNavbar} />
      </Navbar.Section>

      {/* {openNavbar ? (
        <Navbar.Section p={'xs'}>
          <Button
            leftIcon={<IconLogout size="1rem" />}
            variant="outline"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Logout
          </Button>
        </Navbar.Section>
      ) : null} */}
    </Navbar>
  )
}
