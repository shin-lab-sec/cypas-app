import { UnstyledButton, Group, Text, ThemeIcon } from '@mantine/core'
import {
  IconGitPullRequest,
  IconAlertCircle,
  IconMessages,
  IconDatabase,
} from '@tabler/icons-react'
import React, { FC } from 'react'

type _MainLinkProps = {
  icon: React.ReactNode
  color: string
  label: string
}

const _MainLink: FC<_MainLinkProps> = ({ icon, color, label }) => {
  return (
    <UnstyledButton
      sx={theme => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

const data = [
  {
    icon: <IconGitPullRequest size="1rem" />,
    color: 'blue',
    label: 'Pull Requests',
  },
  {
    icon: <IconAlertCircle size="1rem" />,
    color: 'teal',
    label: 'Open Issues',
  },
  { icon: <IconMessages size="1rem" />, color: 'violet', label: 'Discussions' },
  { icon: <IconDatabase size="1rem" />, color: 'grape', label: 'Databases' },
]

export const _MainLinks: FC = () => {
  const links = data.map(link => <_MainLink {...link} key={link.label} />)
  return <div>{links}</div>
}
