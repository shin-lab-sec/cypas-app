import { Button, Group } from '@mantine/core'
import React, { FC } from 'react'
import { ApiError } from '../../../../../foundation/utils/fetchApi'
import { SessionUser } from '../../../../auth/types'
import {
  useReadySandbox,
  useStartSandbox,
  useDeleteSandbox,
} from '../../../../sandbox/hooks'
import { SectionSandbox as SectionSandboxType } from './../../types'

type SectionSandboxProps = {
  user: SessionUser
  section: SectionSandboxType
}

export const SectionSandbox: FC<SectionSandboxProps> = ({ user, section }) => {
  useReadySandbox({
    userName: user.name,
    ownerName: '',
    courseId: section.courseId,
    sectionId: section.id,
    userAgentType: section.userAgent.type,
  })
  const { startSandbox } = useStartSandbox()
  const { deleteSandbox } = useDeleteSandbox()

  return (
    <Group mt={'lg'}>
      <Button
        onClick={async () => {
          try {
            await startSandbox(user)
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
            await deleteSandbox(user)
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
  )
}
