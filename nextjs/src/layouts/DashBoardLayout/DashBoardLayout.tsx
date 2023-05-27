import { Anchor, AppShell, Breadcrumbs, Center, Loader } from '@mantine/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { FC, ReactNode, useState } from 'react'
import { _Header } from './_Header'
import { _Navbar } from './_Navbar'
import { getRoute, routes } from 'foundation/routes'

export const HEADER_HEIGHT = 70
export const NAVBAR_WIDTH = 260
export const NAVBAR_WIDTH_NARROWED = 80

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

  const currentPageTitle = getRoute(router.asPath as keyof typeof routes).title
  const [currentRoute, setCurrentRoute] = useState<keyof typeof routes>('/home')

  const [openNavbar, setOpenNavbar] = useState(true)

  if (!session?.user)
    return (
      <Center mih={'100vh'}>
        <Loader />
      </Center>
    )

  return (
    <AppShell
      padding="md"
      styles={t => ({
        main: {
          backgroundColor: t.colors.dark[8],
        },
      })}
      header={<_Header user={session.user} />}
      navbar={
        <_Navbar
          currentPageTitle={currentPageTitle}
          user={session.user}
          openNavbar={openNavbar}
          onToggleNavber={() => setOpenNavbar(!openNavbar)}
        />
      }
    >
      <Breadcrumbs mb={'md'}>
        {breadcrumbsList.map(item => (
          <Anchor href={item.href} key={item.href} c={'gray.6'}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
      {children}
    </AppShell>
  )
}
