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
    <div className="grid grid-rows-[3fr_1fr_1fr] grid-cols-1 py-10">
      <div className="grid grid-rows-[3fr_1fr] grid-cols-1">
        <div className="rounded-lg" style={{ background: `${rgbToHex(rgb)}` }}></div>
        <div className="text-xl font-normal">{color}</div>
      </div>
      <div>
        <div className="flex">
          <label htmlFor="rgb-r">R</label>
          <input className="w-full" type="range" id="rgb-r" value={rgb.r} max={255} onChange={handleSliderR} /> {rgb.r}
        </div>
        <div className="flex">
          <label htmlFor="rgb-g">G</label>
          <input className="w-full" type="range" id="rgb-g" value={rgb.g} max={255} onChange={handleSliderG} /> {rgb.g}
        </div>
        <div className="flex">
          <label htmlFor="rgb-b">B</label>
          <input className="w-full" type="range" id="rgb-b" value={rgb.b} max={255} onChange={handleSliderB} /> {rgb.b}
        </div>
      </div>
      <Link className="pill-button mt-5 w-fit m-auto" to='/'>Pick a new color</Link>
    </div>
  )
}

export default ColorTweaker