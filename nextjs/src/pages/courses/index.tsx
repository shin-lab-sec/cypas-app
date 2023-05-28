import { Card, Title, Text, SimpleGrid } from '@mantine/core'
import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { getRoute } from 'foundation/routes'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const Courses: NextPage = () => {
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
        {[...Array(9)].map((_, i) => (
          <Card
            key={i}
            shadow="sm"
            padding="xl"
            component="a"
            href={
              getRoute('/courses/:id', {
                id: 'sample-id',
                title: 'XSS初級',
              }).href
            }
            maw={300}
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                height={160}
                width={300}
                alt="No way!"
              />
            </Card.Section>

            <Text weight={500} size="lg" mt="md">
              You&apos;ve won a million dollars in cash!
            </Text>

            <Text mt="xs" color="dimmed" size="sm">
              Please click anywhere on this card to claim your reward, this is
              not a fraud, trust us
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </DashBoardLayout>
  )
}

export default Courses
