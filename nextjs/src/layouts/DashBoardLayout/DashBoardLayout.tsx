import { Anchor, AppShell, Breadcrumbs } from '@mantine/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { FC, ReactNode } from 'react'
import { _Header } from './_Header'
import { _Navbar } from './_Navbar'
import { SessionUser } from 'features/auth/types'
import { SandBox } from 'features/sandbox/components/SandBox'
import { useAppState } from 'foundation/appState'
import { getRoute } from 'foundation/routes'

export const HEADER_HEIGHT = 70
export const NAVBAR_WIDTH = 260
export const NAVBAR_WIDTH_NARROWED = 80

const NAVLINK_KEYS = [
  '/home',
  '/sandbox/search',
  '/courses',
  '/learnig-log',
] as const

type DashBoardLayoutProps = {
  breadcrumbsList: { title: string; href: string }[]
  children: ReactNode
}

export const DashBoardLayout: FC<DashBoardLayoutProps> = ({
  breadcrumbsList,
  children,
}) => {
  const router = useRouter()
  const { data: session } = useSession()

  const currentNavKey = NAVLINK_KEYS.find(key => router.asPath.startsWith(key))
  const currentNavTitle = currentNavKey && getRoute(currentNavKey).title

  const [openNavbar, setOpenNavbar] = useAppState('openNavbar')

  const user: SessionUser = session
    ? session.user
    : { id: '', name: '', email: '' }

  return (
    <AppShell
      padding="md"
      styles={t => ({
        main: {
          backgroundColor: t.colors.dark[8],
        },
      })}
      header={<_Header user={user} />}
      navbar={
        <_Navbar
          currentNavTitle={currentNavTitle || ''}
          user={user}
          openNavbar={openNavbar}
          onToggleNavber={() => setOpenNavbar(!openNavbar)}
        />
      }
    >
      {breadcrumbsList.length > 0 ? (
        <Breadcrumbs mb={'md'}>
          {breadcrumbsList.map(item => (
            <Anchor href={item.href} key={item.href} c={'gray.6'}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      ) : null}

      {children}

      <SandBox user={user} />
    </AppShell>
  )
}
