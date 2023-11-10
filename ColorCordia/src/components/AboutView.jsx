import { useEffect, useState } from "react"
import { getAboutText } from "../services/textContent"
import { textToJsx } from "../utils/textToJsx"

const AboutView = () => {
  const [viewContent, setContent] = useState('')
  useEffect(() => {
    (async () => {
      setContent(textToJsx(await getAboutText()))
    })()
  }, [])

  return (
    <div className="w-1/2 mx-auto mt-8">
      {viewContent}
    </div>
  )
}

export default AboutView