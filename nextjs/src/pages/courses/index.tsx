import { Card, Title, Text, SimpleGrid, Box } from '@mantine/core'
import type { NextPage } from 'next'
import React from 'react'
import { useGetCourses } from 'features/course/hooks'
import { getRoute } from 'foundation/routes'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const Courses: NextPage = () => {
  const [courses] = useGetCourses()

  return (
    <DashBoardLayout breadcrumbsList={[]}>
      <Title size={'h3'}>おすすめのコース</Title>

      <SimpleGrid
        mt={'md'}
        spacing={'lg'}
        breakpoints={[
          { minWidth: 850, cols: 2 },
          { minWidth: 1100, cols: 3 },
          { minWidth: 1350, cols: 4 },
        ]}
      >
        {courses.state === 'hasValue' ? (
          <>
            {courses.contents.map(course => (
              <Card
                key={course.id}
                shadow="sm"
                padding="xl"
                component="a"
                href={
                  getRoute('/courses/:id', {
                    id: course.id,
                    title: course.name,
                  }).href
                }
                maw={300}
              >
                <Card.Section sx={{ aspectRatio: '16/9' }}>
                  {/* TODO: cms用のimgコンポーネント作る */}
                  {course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      height={160}
                      width={300}
                      alt=""
                    />
                  ) : (
                    <Box
                      sx={{
                        display: 'grid',
                        placeItems: 'center',
                        height: '100%',
                        backgroundColor: 'gray',
                      }}
                    >
                      image
                    </Box>
                  )}
                </Card.Section>

                <Text weight={500} size="lg" mt="md">
                  {course.name}
                </Text>

                <Text mt="xs" color="dimmed" size="sm" lineClamp={4}>
                  {course.description}
                </Text>
              </Card>
            ))}
          </>
        ) : null}
      </SimpleGrid>
    </DashBoardLayout>
  )
}

export default Courses
