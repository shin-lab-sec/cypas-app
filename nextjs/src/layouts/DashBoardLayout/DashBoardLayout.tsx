import { Anchor, AppShell, Breadcrumbs, Center, Loader } from '@mantine/core'
import { useSession } from 'next-auth/react'
import React, { FC, ReactNode, useState } from 'react'
import { _Header } from './_Header'
import { _Navbar } from './_Navbar'

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
  const { data: session } = useSession()

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
          user={session.user}
          openNavbar={openNavbar}
          onToggleNavber={() => setOpenNavbar(!openNavbar)}
        />
      }
    >
      <Breadcrumbs>
        {breadcrumbsList.map(item => (
          <Anchor href={item.href} key={item.href}>
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
      {children}
    </AppShell>
  )
}
