import { useEffect, useState } from "react"
import { hexToRgb, rgbToHex } from "../../utils/colorConverters"
import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const ColorTweaker = ({ color, setColor }) => {
  const [rgb, setRbg] = useState(null)

  useEffect(() => {
    if (color) {

      setRbg(hexToRgb(color))
    }
  }, [color])

  const handleSliderR = event => {
    setRbg({ ...rgb, r: event.target.value })
    setColor(rgbToHex(rgb))
  }

  const handleSliderG = event => {
    setRbg({ ...rgb, g: event.target.value })
    setColor(rgbToHex(rgb))

  }

  const handleSliderB = event => {
    setRbg({ ...rgb, b: event.target.value })
    setColor(rgbToHex(rgb))

  }
  if (!rgb) {
    return null
  }
  return (
    <>
      <div style={{ background: `${rgbToHex(rgb)}` }}>{color}</div>
      R
      <input type="range" value={rgb.r} max={255} onChange={handleSliderR} /> {rgb.r}
      G
      <input type="range" value={rgb.g} max={255} onChange={handleSliderG} /> {rgb.g}
      B
      <input type="range" value={rgb.b} max={255} onChange={handleSliderB} /> {rgb.b}

      <Link to='/'>Pick a new color</Link>
    </>
  )
}

export default ColorTweaker