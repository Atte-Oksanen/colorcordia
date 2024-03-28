import React, { useEffect, useState } from "react"
import { getAboutText } from "../../services/textContent"
import MarkDown from 'react-markdown'
import LoadingComponent from '../utils/LoadingComponent'
import { Link } from "react-router-dom"

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
      <div>Psst... You can help this project by giving some attributes to colors <Link to={'/colorattribute'} className="link-text"> here</Link>.</div>
      <div className="markdown py-5">
        <MarkDown components={{ a: LinkRenderer as any }}>
          {viewContent}
        </MarkDown>
      </div>
    </div>
  )
}

export default AboutView