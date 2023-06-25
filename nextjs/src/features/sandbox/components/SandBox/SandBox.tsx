import { Box, Button, Stack, Text } from '@mantine/core'
import { IconLoader } from '@tabler/icons-react'
import React, { FC, useState } from 'react'

type SandBoxProps = {}

export const SandBox: FC<SandBoxProps> = ({}) => {
  const [expanding, setExpanding] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* 左下のホバー領域拡張 */}
      {expanding ? (
        <Box
          onMouseLeave={() => {
            setExpanding(false)
            setIsExpanded(false)
          }}
          sx={{
            zIndex: 998,
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: 150,
            height: 150,
          }}
        />
      ) : null}

      <Box
        onMouseEnter={() => setExpanding(true)}
        onMouseLeave={() => {
          setExpanding(false)
          setIsExpanded(false)
        }}
        onTransitionEnd={() => expanding && setIsExpanded(true)}
        sx={t => ({
          zIndex: 999,
          position: 'fixed',
          bottom: t.spacing.sm,
          left: t.spacing.sm,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: t.spacing.md,
          // backgroundColor: 'orange',
          border: '2px solid',
          borderColor: 'white',
          borderRadius: 999,
          transitionDuration: '700ms',
          width: expanding ? 300 : 80,
          height: expanding ? 300 : 80,
        })}
      >
        {isExpanded ? (
          <Stack>
            <Text c={'white'}>サンドボックス</Text>
            <Text c={'white'}>色々起動時の情報</Text>
            <Button variant="filled">作成する</Button>
          </Stack>
        ) : (
          <IconLoader size={50} color="white" />
        )}
      </Box>
    </>
  )
}
