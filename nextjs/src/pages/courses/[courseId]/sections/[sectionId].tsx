import { Title } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useVerifiedSession } from 'features/auth/hooks'
import { useGetSection } from 'features/section/hooks'
import { SectionArticle } from 'features/section/sandbox/components/SectionArticle'
import { SectionSandbox } from 'features/section/sandbox/components/SectionSandbox'
import { getRoute } from 'foundation/routes'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const Section: NextPage = () => {
  const router = useRouter()
  const [section] = useGetSection(router.query.sectionId as string)

  const { data: session } = useVerifiedSession()

  return (
    <DashBoardLayout
      breadcrumbsList={[
        getRoute('/courses'),
        getRoute('/courses/:id', {
          id: section.state === 'hasValue' ? section.contents.courseId : '',
          title: 'XSS初級',
        }),
        getRoute('/courses/:cid/sections/:sid', {
          cid: section.state === 'hasValue' ? section.contents.courseId : '',
          sid: section.state === 'hasValue' ? section.contents.id : '',
          title: section.state === 'hasValue' ? section.contents.name : '',
        }),
      ]}
    >
      {section.state === 'hasValue' ? (
        <>
          <Title size={'h3'}>{section.contents.name}</Title>

          {section.contents.type === 'article' && session ? (
            <SectionArticle section={section.contents} />
          ) : null}
          {section.contents.type === 'quiz' ? <div>quiz</div> : null}
          {section.contents.type === 'sandbox' && session ? (
            <SectionSandbox user={session.user} section={section.contents} />
          ) : null}
        </>
      ) : null}
    </DashBoardLayout>
  )
}

export default Section
