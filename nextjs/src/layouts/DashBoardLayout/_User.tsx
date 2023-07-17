import { Box, Text, rem, UnstyledButton, Group, Avatar } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import React, { FC } from 'react'
import { SessionUser } from 'features/auth/types'

type _UserProps = {
  compact: boolean
  user: SessionUser
}

export const _User: FC<_UserProps> = ({ user, compact }) => {
  return (
    <UnstyledButton
      sx={t => ({
        display: 'block',
        width: '100%',
        padding: t.spacing.xs,
        borderRadius: t.radius.sm,
        color: t.colors.dark[0],

        '&:hover': {
          backgroundColor: t.colors.dark[4],
        },
      })}
    >
      <Group noWrap w={compact ? '38px' : undefined} h={'48px'}>
        <Avatar
          src={`https://www.gravatar.com/avatar/${user.name}/?d=retro`}
          radius="xl"
        />
        {compact ? null : (
          <>
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {user.name}
              </Text>
              <Text color="dimmed" size="xs">
                {user.email}
              </Text>
            </Box>
            <IconChevronDown size={rem(18)} />
          </>
        )}
      </Group>
    </UnstyledButton>
  )
}
