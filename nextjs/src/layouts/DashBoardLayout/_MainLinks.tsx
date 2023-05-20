import { UnstyledButton, Group, Text, ThemeIcon } from '@mantine/core'
import {
  IconGitPullRequest,
  IconMessages,
  IconSettings,
  IconContainer,
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
    label: 'コース一覧',
  },
  {
    icon: <IconContainer size="1rem" />,
    color: 'teal',
    label: '起動中のサンドボックス',
  },
  { icon: <IconMessages size="1rem" />, color: 'violet', label: '学習記録' },
  { icon: <IconSettings size="1rem" />, color: 'pink', label: '設定' },
]

export const _MainLinks: FC = () => {
  const links = data.map(link => <_MainLink {...link} key={link.label} />)
  return <div>{links}</div>
}
