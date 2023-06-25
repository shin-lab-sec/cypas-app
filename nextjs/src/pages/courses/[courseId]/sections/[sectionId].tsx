import { Title, Text, Button, Group } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useVerifiedSession } from 'features/auth/hooks'
import {
  useReadySandbox,
  useStartSandbox,
  useDeleteSandbox,
} from 'features/sandbox/hooks'
import { getRoute } from 'foundation/routes'
import { ApiError } from 'foundation/utils/fetchApi'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const fetchSection = (id: string) =>
  ({
    type: 'sandbox',
    id: 'section-id',
    courseId: 'course-id',
    title: 'まずは体験してみよう',
    description: 'さぁ、Linuxを体験しよう！',
    userAgentType: 'vdi',
  } as const)

const Section: NextPage = () => {
  const router = useRouter()
  const section = fetchSection(router.query.sectionId as string)

  const { data: session } = useVerifiedSession()

  useReadySandbox({
    userName: session?.user.name || '',
    ownerName: '',
    courseId: section.courseId,
    sectionId: section.id,
    userAgentType: section.userAgentType,
  })
  const { startSandbox } = useStartSandbox()
  const { deleteSandbox } = useDeleteSandbox()

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

      {session ? (
        <Group mt={'lg'}>
          <Button
            onClick={async () => {
              try {
                await startSandbox(session.user)
              } catch (e) {
                if (e instanceof ApiError) {
                  console.log(e)
                }
              }
            }}
          >
            スタート
          </Button>
          <Button
            onClick={async () => {
              try {
                await deleteSandbox(session.user)
              } catch (e) {
                if (e instanceof ApiError) {
                  console.log(e)
                }
              }
            }}
          >
            削除
          </Button>
        </Group>
      ) : null}
    </DashBoardLayout>
  )
}

export default Section
