import {
  AppShell,
  Navbar,
  Header,
  Button,
  Text,
  Avatar,
  Flex,
  Group,
} from '@mantine/core'
import { IconChevronDown, IconLogout } from '@tabler/icons-react'
import { signOut, useSession } from 'next-auth/react'
import React, { FC, ReactNode } from 'react'
import { _MainLinks } from './_MainLinks'
import { _User } from './_User'

export const HEADER_HEIGHT = 70
export const SIDEBAR_WIDTH = 250

type DashBoardLayoutProps = {
  children: ReactNode
}

export const DashBoardLayout: FC<DashBoardLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession()

  if (!session?.user) return null

  return (
    <AppShell
      padding="md"
      styles={t => ({
        main: {
          backgroundColor: t.colors.dark[8],
        },
      })}
      header={
        <Header height={HEADER_HEIGHT} p="xs">
          <Flex h={'100%'} justify={'flex-end'} align={'center'}>
            <Group>
              <Avatar
                src={`https://www.gravatar.com/avatar/${session.user.name}/?d=retro`}
                radius="xl"
              />
              <Text>{session.user.name}</Text>
              <IconChevronDown size={18} />
            </Group>
          </Flex>
        </Header>
      }
      navbar={
        <Navbar p={'xs'} width={{ base: SIDEBAR_WIDTH }} top={0} mih={'100vh'}>
          <Navbar.Section
            my={'-0.625rem'}
            mih={HEADER_HEIGHT}
            sx={{ borderBottom: '0.0625rem solid #2C2E33' }}
          >
            <Text ml={'md'} fz={40} fw={'bolder'} color="green">
              Cypas
            </Text>
          </Navbar.Section>

          <Navbar.Section grow mt="xl">
            <_MainLinks />
          </Navbar.Section>

          <Navbar.Section p={'xs'}>
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
    >
      {children}
    </AppShell>
  )
}
