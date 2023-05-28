import { Text, ThemeIcon, Flex, Box } from '@mantine/core'
import {
  Icon3dCubeSphere,
  IconChartHistogram,
  IconHome,
  IconListDetails,
} from '@tabler/icons-react'
import Link from 'next/link'
import React, { FC } from 'react'
import { getRoute } from 'foundation/routes'

const links: {
  icon: (size: string) => JSX.Element
  color: string
  label: string
  href: string
}[] = [
  {
    icon: size => <IconHome size={size} />,
    color: 'yellow',
    label: getRoute('/home').title,
    href: getRoute('/home').href,
  },
  {
    icon: size => <Icon3dCubeSphere size={size} />,
    color: 'teal',
    label: getRoute('/sandbox').title,
    href: getRoute('/sandbox').href,
  },
  {
    icon: size => <IconListDetails size={size} />,
    color: 'blue',
    label: getRoute('/courses').title,
    href: getRoute('/courses').href,
  },
  {
    icon: size => <IconChartHistogram size={size} />,
    color: 'violet',
    label: getRoute('/learnig-log').title,
    href: getRoute('/learnig-log').href,
  },
]

export type _NavLinksProps = {
  currentPageTitle: string
  compact: boolean
}

export const _NavLinks: FC<_NavLinksProps> = ({
  currentPageTitle,
  compact,
}) => {
  return (
    <div>
      {links.map(link => {
        const active = currentPageTitle === link.label
        return (
          <Box
            component={Link}
            key={link.href}
            href={link.href}
            sx={t => ({
              display: 'flex',
              width: '100%',
              padding: t.spacing.xs,
              borderRadius: t.radius.sm,
              color: t.colors.dark[0],
              textDecoration: 'none',

              '&:hover': {
                backgroundColor: t.colors.dark[4],
              },
            })}
          >
            <Flex
              w={compact ? '38px' : undefined}
              gap={'sm'}
              wrap={'nowrap'}
              justify={'center'}
              align={'center'}
            >
              <ThemeIcon
                color={active ? 'orange.2' : 'gray.1'}
                variant="light"
                size={compact ? 'lg' : 'md'}
              >
                {link.icon(compact ? '1.3rem' : '1rem')}
              </ThemeIcon>

              {compact ? null : (
                <Text
                  size="sm"
                  sx={{ whiteSpace: 'nowrap' }}
                  c={active ? 'orange.3' : 'gray.4'}
                >
                  {link.label}
                </Text>
              )}
            </Flex>
          </Box>
        )
      })}
    </div>
  )
}
