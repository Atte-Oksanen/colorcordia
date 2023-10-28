import { useState } from "react"
import VisualiserBlog from "./VisualiserBlog"
import VisualiserCalendar from "./VisualiserCalendar"
import VisualiserDashboard from "./VisualiserDashboard"

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
        Secondary supporting color<input type="color" />
        <button type="submit">submit</button>
      </form>
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '40rem', overflow: 'hidden' }}>
        <VisualiserBlog colors={colors}></VisualiserBlog>
      </div>
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '40rem', overflow: 'hidden', marginLeft: '1rem' }}>
        <VisualiserCalendar colors={colors}></VisualiserCalendar>
      </div>
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '40rem', overflow: 'hidden', marginLeft: '1rem' }}>
        <VisualiserDashboard colors={colors}></VisualiserDashboard>
      </div>
    </div>
  )
}

export default SchemeVisualiserView