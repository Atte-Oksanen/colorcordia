import { useEffect, useState } from "react"
import { getAboutText } from "../services/textContent"
import { textToJsx } from "../utils/textToJsx"
import LoadingComponent from './utils/LoadingComponent'
const AboutView = () => {
  const [viewContent, setContent] = useState([])
  useEffect(() => {
    (async () => {
      setContent(textToJsx(await getAboutText()))
    })()
  }, [])

  if (viewContent.length < 1) {
    return (
      <div className="h-fit m-auto">
        <LoadingComponent></LoadingComponent>
      </div>
    )
  }
  return (
    <div className="md:w-1/2 w-3/4 mx-auto mt-8">
      {viewContent}
    </div>
  )
}

export default AboutView