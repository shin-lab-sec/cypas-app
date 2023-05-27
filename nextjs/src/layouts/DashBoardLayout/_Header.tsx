import { Avatar, Flex, Group, Header, Text } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import React, { FC } from 'react'
import { HEADER_HEIGHT } from './DashBoardLayout'
import { SessionUser } from 'features/auth/types'

type _HeaderProps = {
  user: Pick<SessionUser, 'name'>
}

export const _Header: FC<_HeaderProps> = ({ user }) => {
  return (
    <Header height={HEADER_HEIGHT} p="xs">
      <Flex h={'100%'} justify={'space-between'} align={'center'}>
        <Text ml={'md'} fz={40} fw={'bolder'} color="green">
          Cypas
        </Text>
        <Group>
          <Avatar
            src={`https://www.gravatar.com/avatar/${user.name}/?d=retro`}
            radius="xl"
          />
          <Text>{user.name}</Text>
          <IconChevronDown size={18} />
        </Group>
      </Flex>
    </Header>
  )
}
