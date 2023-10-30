/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import VisualiserBlog from "./VisualiserBlog"
import VisualiserCalendar from "./VisualiserCalendar"
import VisualiserDashboard from "./VisualiserDashboard"
import { getPalettes } from "../../services/palettes"
import PaletteDropDown from "../utils/PaletteDropDown"
import { createRandomHarmony, randomizeColor } from "../../utils/colorRandomizer"
import { getTextColor } from "../../utils/colorConverters"

const SchemeVisualiserView = ({ palettes, setPalettes, user }) => {
  const [colors, setColors] = useState([])

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: '1fr',
    height: '1rem'
  }
  useEffect(() => {
    if (palettes.length < 1) {
      (async () => {
        setPalettes(await getPalettes())
      })()
    }
  }, [])

  useEffect(() => {
    setColors(createRandomHarmony(randomizeColor()))
  }, [])

  const randomizeColors = () => {
    const randColors = createRandomHarmony(randomizeColor())
    setColors(randColors)
  }

  const handleColorInput = event => {
    event.preventDefault()
    const colors = []
    for (let index = 0; index < event.target.length - 1; index++) {
      colors.push(event.target[index].value)
    }
    setColors(colors)
  }

  if (colors.length < 1) {
    return null
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
      <button onClick={() => randomizeColors()}>Randomize palette</button>
      <br />
      <div>
        Shown palette
        <div style={{ ...gridContainerStyle, width: '30rem' }}>
          <div style={{ background: colors[0], gridArea: '1/1/2/2', color: getTextColor(colors[0]) }}>{colors[0]}</div>
          <div style={{ background: colors[1], gridArea: '1/2/2/3', color: getTextColor(colors[1]) }}>{colors[1]}</div>
          <div style={{ background: colors[2], gridArea: '1/3/2/4', color: getTextColor(colors[2]) }}>{colors[2]}</div>
          <div style={{ background: colors[3], gridArea: '1/4/2/5', color: getTextColor(colors[3]) }}>{colors[3]}</div>
          <div style={{ background: colors[4], gridArea: '1/5/2/6', color: getTextColor(colors[4]) }}>{colors[4]}</div>
        </div>
      </div>
      <br />
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '38rem', overflow: 'hidden', transform: 'scale(0.9)' }}>
        <VisualiserBlog colors={colors}></VisualiserBlog>
      </div>
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '38rem', overflow: 'hidden', marginLeft: '0.5rem', transform: 'scale(0.9)' }}>
        <VisualiserCalendar colors={colors}></VisualiserCalendar>
      </div>
      <div style={{ display: 'inline-block', borderRadius: '1rem', width: '38rem', overflow: 'hidden', transform: 'scale(0.9)' }}>
        <VisualiserDashboard colors={colors}></VisualiserDashboard>
      </div>
    </div>
  )
}

export default SchemeVisualiserView