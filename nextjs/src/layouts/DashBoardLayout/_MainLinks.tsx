import { UnstyledButton, Text, ThemeIcon, Flex } from '@mantine/core'
import {
  Icon3dCubeSphere,
  IconChartHistogram,
  IconHome,
  IconListDetails,
} from '@tabler/icons-react'
import React, { FC } from 'react'

type _MainLinkProps = {
  compact: boolean
  icon: (size: string) => React.ReactNode
  color: string
  label: string
}

const _MainLink: FC<_MainLinkProps> = ({ compact, icon, color, label }) => {
  return (
    <UnstyledButton
      sx={t => ({
        display: 'flex',
        width: '100%',
        padding: t.spacing.xs,
        borderRadius: t.radius.sm,
        color: t.colors.dark[0],

        '&:hover': {
          backgroundColor: t.colors.dark[4],
        },
      })}
    >
      <Flex
        w={compact ? '38px' : undefined}
        gap={'md'}
        wrap={'nowrap'}
        justify={'center'}
        align={'center'}
      >
        <ThemeIcon color={color} variant="filled" size={compact ? 'lg' : 'md'}>
          {icon(compact ? '1.3rem' : '1rem')}
        </ThemeIcon>

        {compact ? null : (
          <Text size="sm" sx={{ whiteSpace: 'nowrap' }}>
            {label}
          </Text>
        )}
      </Flex>
    </UnstyledButton>
  )
}

const data = [
  {
    icon: (size: string) => <IconHome size={size} />,
    color: 'yellow',
    label: 'ホーム',
  },
  {
    icon: (size: string) => <Icon3dCubeSphere size={size} />,
    color: 'teal',
    label: '起動中のサンドボックス',
  },
  {
    icon: (size: string) => <IconListDetails size={size} />,
    color: 'blue',
    label: 'コース',
  },
  // {
  //   icon: (size: string) => <IconGitPullRequest size={size} />,
  //   color: 'orange',
  //   label: 'シナリオ一覧',
  // },
  {
    icon: (size: string) => <IconChartHistogram size={size} />,
    color: 'violet',
    label: '学習記録',
  },
]

export type _MainLinksProps = {
  compact: boolean
}

export const _MainLinks: FC<_MainLinksProps> = ({ compact }) => {
  const links = data.map(link => (
    <_MainLink {...link} key={link.label} compact={compact} />
  ))
  return <div>{links}</div>
}
