import { Navbar, Button, ActionIcon } from '@mantine/core'
import {
  IconChevronsLeft,
  IconChevronsRight,
  IconLogout,
} from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
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
  currentPageTitle: string
  user: Pick<SessionUser, 'name' | 'email'>
  openNavbar: boolean
  onToggleNavber: () => void
}

export const _Navbar: FC<_NavbarProps> = ({
  currentPageTitle,
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
            <IconChevronsLeft size="1.125rem" />
          ) : (
            <IconChevronsRight size="1.125rem" />
          )}
        </ActionIcon>
      </Navbar.Section>

      <Navbar.Section grow mt={'xs'}>
        <_NavLinks currentPageTitle={currentPageTitle} compact={!openNavbar} />
      </Navbar.Section>

      {openNavbar ? (
        <Navbar.Section p={'xs'}>
          <Button
            leftIcon={<IconLogout size="1rem" />}
            variant="light"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Logout
          </Button>
        </Navbar.Section>
      ) : null}

      <Navbar.Section>
        <_User user={user} compact={!openNavbar} />
      </Navbar.Section>
    </Navbar>
  )
}
