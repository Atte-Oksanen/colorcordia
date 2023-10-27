import { useState } from "react"
import VisualiserBlog from "./VisualiserBlog"

const SchemeVisualiserView = () => {
  const [colors, setColors] = useState([])

  const handleColorInput = event => {
    event.preventDefault()
    const colors = []
    for (let index = 0; index < event.target.length - 1; index++) {
      colors.push(event.target[index].value)
    }
    setColors(colors)
  }

  return (
    <div>
      <form onSubmit={handleColorInput}>
        Primary key color<input type="color" />
        Secondary key color<input type="color" />
        Tertiary key color<input type="color" />
        Supporting color<input type="color" />
        <button type="submit">submit</button>
      </form>
      <div style={{ border: '1px solid black', width: '50rem' }}>

        <VisualiserBlog colors={colors}></VisualiserBlog>
      </div>
    </div>
  )
}

export default SchemeVisualiserView