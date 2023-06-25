import {
  Avatar,
  Flex,
  Group,
  Header,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import React, { FC } from 'react'
import { HEADER_HEIGHT } from './DashBoardLayout'
import { SessionUser } from 'features/auth/types'

type _HeaderProps = {
  user: Pick<SessionUser, 'name' | 'email'>
}

export const _Header: FC<_HeaderProps> = ({ user }) => {
  return (
    <Header height={HEADER_HEIGHT} p="xs">
      <Flex h={'100%'} justify={'space-between'} align={'center'}>
        <Text ml={'md'} fz={40} fw={'bolder'} color="teal.5">
          Cypas
        </Text>

        <UnstyledButton
          sx={t => ({
            display: 'block',
            padding: t.spacing.xs,
            borderRadius: t.radius.sm,
            color: t.colors.dark[0],

            '&:hover': {
              backgroundColor: t.colors.dark[4],
            },
          })}
        >
          <Group spacing={'xs'}>
            <Avatar
              src={`https://www.gravatar.com/avatar/${user.name}/?d=retro`}
              radius="xl"
            />

            <IconChevronDown size={rem(18)} />
          </Group>
        </UnstyledButton>
      </Flex>
    </Header>
  )
}
