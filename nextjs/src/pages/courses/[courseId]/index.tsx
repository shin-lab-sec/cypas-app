import { Title, Text, Box, Stack, Button } from '@mantine/core'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetCourse } from 'features/course/hooks'
import { getRoute } from 'foundation/routes'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const Course: NextPage = () => {
  const router = useRouter()
  const [course] = useGetCourse(router.query.courseId as string)
  return (
    <DashBoardLayout
      breadcrumbsList={[
        getRoute('/courses'),
        getRoute('/courses/:id', {
          id: router.query.courseId as string,
          title: course.state === 'hasValue' ? course.contents.name : '',
        }),
      ]}
    >
      {course.state == 'hasValue' ? (
        <>
          <Title size={'h3'}>{course.contents.name}</Title>

          <Text mt="sm">{course.contents.description}</Text>

          <Stack mt={'lg'}>
            {course.contents.sections?.map(section => (
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
                  {section.name}
                </Text>

                <Button
                  component={Link}
                  href={`/courses/${course.contents.id}/sections/${section.id}`}
                >
                  体験する
                </Button>
              </Box>
            ))}
          </Stack>
        </>
      ) : null}
    </DashBoardLayout>
  )
}

export default Course
