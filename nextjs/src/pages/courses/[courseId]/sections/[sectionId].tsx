import { Title, Text } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { getRoute } from 'foundation/routes'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const fetchSection = (id: string) => ({
  type: 'sandbox',
  id: 'section-id',
  courseId: 'course-id',
  title: 'まずは体験してみよう',
  description: 'さぁ、Linuxを体験しよう！',
})

const Section: NextPage = () => {
  const router = useRouter()
  const section = fetchSection(router.query.sectionId as string)

  return (
    <DashBoardLayout
      breadcrumbsList={[
        getRoute('/courses'),
        getRoute('/courses/:id', { id: section.courseId, title: 'XSS初級' }),
        getRoute('/courses/:cid/sections/:sid', {
          cid: section.courseId,
          sid: section.id,
          title: section.title,
        }),
      ]}
    >
      <Title size={'h3'}>{section.title}</Title>

      <Text mt="sm">{section.description}</Text>
    </DashBoardLayout>
  )
}

export default Section
