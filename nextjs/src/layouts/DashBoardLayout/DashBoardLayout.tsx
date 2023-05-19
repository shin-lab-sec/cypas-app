import { AppShell, Navbar, Header, Button } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { signOut, useSession } from 'next-auth/react'
import React, { FC, ReactNode } from 'react'
import { _MainLinks } from './_MainLinks'
import { _User } from './_User'

type DashBoardLayoutProps = {
  children: ReactNode
}

export const DashBoardLayout: FC<DashBoardLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession()

  if (!session?.user) return null

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar p="xs" width={{ base: 300 }}>
          <Navbar.Section grow mt="md">
            <_MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <Button
              leftIcon={<IconLogout size="1rem" />}
              variant="light"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Logout
            </Button>
          </Navbar.Section>
          <Navbar.Section>
            <_User user={session.user} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={t => ({
        main: {
          backgroundColor: t.colors.dark[8],
        },
      })}
    >
      {children}
    </AppShell>
  )
}
