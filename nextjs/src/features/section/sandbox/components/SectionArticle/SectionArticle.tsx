import React, { FC, useEffect, useRef } from 'react'
import { SectionArticle as SectionArticleType } from '../../../../section/article/types'

type SectionArticleProps = {
  section: SectionArticleType
}

export const SectionArticle: FC<SectionArticleProps> = ({ section }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height}px`
      }
    }

    window.addEventListener('message', handleMessage)

    return () => window.removeEventListener('message', handleMessage)
  }, [iframeRef])

  if (section.articleIds.length < 1) {
    return <p>記事がありません。</p>
  }

  return (
    <div>
      <iframe
        ref={iframeRef}
        src={`${process.env.NEXT_PUBLIC_CMS_URL}/articles/${section.articleIds[0]}`}
        width={'100%'}
        height={'0'}
        scrolling="no"
        style={{
          border: 'none',
        }}
      ></iframe>
    </div>
  )
}
