import { useEffect, useState } from "react"
import { hexToRgb, rgbToHex } from "../../utils/colorConverters"
import { Link } from "react-router-dom"
import NextIcon from "../icons/NextIcon"

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
        <div className="rounded-lg border border-gray-300" style={{ background: `${rgbToHex(rgb)}` }}></div>
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
      <button className="pill-button-empty mt-5 w-fit m-auto">
        <Link to='/'>
          <div className="inline-block align-text-top rotate-180 mr-2">
            <NextIcon sizeClass={'h-5 w-5'}></NextIcon>
          </div>
          Pick a new color
        </Link>
      </button>
    </div>
  )
}

export default ColorTweaker