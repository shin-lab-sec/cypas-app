import { Title, Text, Box, Stack, Button } from '@mantine/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { getRoute } from 'foundation/routes'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const fetchCourse = (id: string) => ({
  id: 'sample-id',
  title: 'XSS初級',
  description:
    'このコースでは、実際にXSSを体験することができます。XSS（クロスサイトスクリプティング）は、ウェブアプリケーションの脆弱性を悪用して、悪意のあるスクリプトを他のユーザーのブラウザ上で実行する攻撃方法です。この初級コースでは、XSSの基本的な概念や種類、そして防御方法について学びます。',
  sections: [
    {
      id: 'section-id1',
      title: 'まずは体験してみよう',
    },
    {
      id: 'section-id2',
      title: '反射型XSS',
    },
    {
      id: 'section-id3',
      title: '格納型XSS',
    },
    {
      id: 'section-id4',
      title: 'XSS対策',
    },
  ],
})

const Course: NextPage = () => {
  const router = useRouter()
  const course = fetchCourse(router.query.courseId as string)

  return (
    <DashBoardLayout
      breadcrumbsList={[
        getRoute('/courses'),
        getRoute('/courses/:id', { id: course.id, title: course.title }),
      ]}
    >
      <Title size={'h3'}>{course.title}</Title>

      <Text mt="sm">{course.description}</Text>

      <Stack mt={'lg'}>
        {course.sections.map(section => (
          <Box
            key={section.id}
            sx={t => ({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: t.spacing.md,
              borderRadius: t.radius.sm,
              color: t.colors.dark[0],
              textDecoration: 'none',
              border: `1px solid ${t.colors.gray[5]}`,
            })}
          >
            <Text size="md" sx={{ whiteSpace: 'nowrap' }} c={'gray.4'}>
              {section.title}
            </Text>

            <Button
              component={Link}
              href={`/courses/${course.id}/sections/${'section-id'}`}
            >
              体験する
            </Button>
          </Box>
        ))}
      </Stack>
    </DashBoardLayout>
  )
}

export default Course
