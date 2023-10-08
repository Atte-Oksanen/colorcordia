import { useEffect, useState } from "react"
import { hexToRgb, rgbToHex } from "../utils/colorConverters"

/* eslint-disable react/prop-types */
const ColorTweaker = ({ color, setColor }) => {
  const [rgb, setRbg] = useState(hexToRgb(color))

  useEffect(() => {
    setRbg(hexToRgb(color))
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
  return (
    <>
      <div style={{ background: `${rgbToHex(rgb)}` }}>{color}</div>
      R
      <input type="range" value={rgb.r} max={255} onChange={handleSliderR} />
      G
      <input type="range" value={rgb.g} max={255} onChange={handleSliderG} />
      B
      <input type="range" value={rgb.b} max={255} onChange={handleSliderB} />
    </>
  )
}

export default ColorTweaker