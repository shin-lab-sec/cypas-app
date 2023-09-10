import React, { FC, useEffect, useRef } from 'react'
import { SessionUser } from '../../../../auth/types'
import { useReadySandbox } from '../../../../sandbox/hooks'
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

  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.iframeHeight) {
        if (iframeRef.current) {
          iframeRef.current.style.height = `${event.data.iframeHeight}px`
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div>
      <iframe
        ref={iframeRef}
        src={`${process.env.NEXT_PUBLIC_CMS_URL}/articles/${section.articleIds[0]}`}
        width={'100%'}
        scrolling="no"
        style={{
          border: 'none',
        }}
      ></iframe>
    </div>
  )
}
