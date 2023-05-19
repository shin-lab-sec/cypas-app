import { Box, Text, rem, UnstyledButton, Group, Avatar } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import React, { FC } from 'react'

type _UserProps = {}

export const _User: FC<_UserProps> = ({}) => {
  return (
    <Box
      sx={t => ({
        paddingTop: t.spacing.sm,
        borderTop: `${rem(1)} solid ${
          t.colorScheme === 'dark' ? t.colors.dark[4] : t.colors.gray[2]
        }`,
      })}
    >
      <UnstyledButton
        sx={t => ({
          display: 'block',
          width: '100%',
          padding: t.spacing.xs,
          borderRadius: t.radius.sm,
          color: t.colorScheme === 'dark' ? t.colors.dark[0] : t.black,

          '&:hover': {
            backgroundColor:
              t.colorScheme === 'dark' ? t.colors.dark[6] : t.colors.gray[0],
          },
        })}
      >
        <Group>
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Amy Horsefighter
            </Text>
            <Text color="dimmed" size="xs">
              ahorsefighter@gmail.com
            </Text>
          </Box>

          <IconChevronRight size={rem(18)} />
        </Group>
      </UnstyledButton>
    </Box>
  )
}
