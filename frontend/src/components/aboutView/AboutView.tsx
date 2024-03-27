import React, { useEffect, useState } from "react"
import { getAboutText } from "../../services/textContent"
import MarkDown from 'react-markdown'
import LoadingComponent from '../utils/LoadingComponent'

const AboutView = () => {
  const [viewContent, setContent] = useState('')

  useEffect(() => {
    (async () => {
      setContent((await getAboutText()))
    })()
  }, [])

  const LinkRenderer = (props: { href: string, children: React.ReactNode }) => {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    )
  }

  if (viewContent.length < 1) {
    return (
      <div className="h-full flex">
        <LoadingComponent></LoadingComponent>
      </div>
    )
  }

  return (
    <div className="md:w-1/2 w-3/4 mx-auto mt-8">
      <div className="markdown py-5">
        <MarkDown components={{ a: LinkRenderer as any }}>
          {viewContent}
        </MarkDown>
      </div>
    </div>
  )
}

export default AboutView