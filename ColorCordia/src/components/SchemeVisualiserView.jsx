import { useState } from "react"
import VisualiserCanvas from "./VisualiserCanvas"

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
        bg1<input type="color" />
        bg2<input type="color" />
        w1<input type="color" />
        w2<input type="color" />
        <button type="submit">submit</button>
      </form>
      {colors.length > 1 && <VisualiserCanvas colors={colors}></VisualiserCanvas>}
    </div>
  )
}

export default SchemeVisualiserView