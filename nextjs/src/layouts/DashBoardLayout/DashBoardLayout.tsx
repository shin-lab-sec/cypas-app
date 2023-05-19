import { AppShell, Navbar, Header } from '@mantine/core'
import React, { FC, ReactNode } from 'react'
import { _Brand } from './_Brand'
import { _MainLinks } from './_MainLinks'
import { _User } from './_User'

type DashBoardLayoutProps = {
  children: ReactNode
}

export const DashBoardLayout: FC<DashBoardLayoutProps> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar p="xs" width={{ base: 300 }}>
          <Navbar.Section mt="xs">
            <_Brand />
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <_MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <_User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
    </AppShell>
  )
}
