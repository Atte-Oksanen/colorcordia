/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import VisualiserBlog from "./VisualiserBlog"
import VisualiserCalendar from "./VisualiserCalendar"
import VisualiserDashboard from "./VisualiserDashboard"
import { getPalettes } from "../services/palettes"
import PaletteDropDown from "./PaletteDropDown"

const SchemeVisualiserView = ({ palettes, setPalettes, user }) => {
  const [colors, setColors] = useState([])
  useEffect(() => {
    if (palettes.length < 1) {
      (async () => {
        setPalettes(await getPalettes())
      })()
    }
  }, [])

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
      Select from community created palettes
      <PaletteDropDown palettes={palettes} setColors={setColors}></PaletteDropDown>
      {user &&
        <div>
          Choose from your own palettes
          <PaletteDropDown palettes={palettes.filter(palette => palette.user.id === user.id)} setColors={setColors}></PaletteDropDown>
        </div>
      }
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '40rem', overflow: 'hidden' }}>
        <VisualiserBlog colors={colors}></VisualiserBlog>
      </div>
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '40rem', overflow: 'hidden', marginLeft: '1rem' }}>
        <VisualiserCalendar colors={colors}></VisualiserCalendar>
      </div>
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '40rem', overflow: 'hidden' }}>
        <VisualiserDashboard colors={colors}></VisualiserDashboard>
      </div>
    </div>
  )
}

export default SchemeVisualiserView