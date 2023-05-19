import { Box, Text, rem, UnstyledButton, Group, Avatar } from '@mantine/core'
import { User } from '@prisma/client'
import { IconChevronRight } from '@tabler/icons-react'
import React, { FC } from 'react'

type _UserProps = {
  user: Pick<User, 'name' | 'email'>
}

export const _User: FC<_UserProps> = ({ user }) => {
  return (
    <Box
      sx={t => ({
        paddingTop: t.spacing.sm,
        borderTop: `${rem(1)} solid ${t.colors.dark[4]}`,
      })}
    >
      <UnstyledButton
        sx={t => ({
          display: 'block',
          width: '100%',
          padding: t.spacing.xs,
          borderRadius: t.radius.sm,
          color: t.colors.dark[0],

          '&:hover': {
            backgroundColor: t.colors.dark[6],
          },
        })}
      >
        <Group>
          <Avatar
            src={`https://www.gravatar.com/avatar/${user.name}/?d=retro`}
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.name}
            </Text>
            <Text color="dimmed" size="xs">
              {user.email}
            </Text>
          </Box>

          <IconChevronRight size={rem(18)} />
        </Group>
      </UnstyledButton>
    </Box>
  )
}
