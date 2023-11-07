import { Link } from "react-router-dom"
import NextIcon from "../icons/NextIcon"
import ColorRange from "../utils/ColorRange"

/* eslint-disable react/prop-types */
const ColorTweaker = ({ color, setColor }) => {
  if (!color) {
    return null
  }
  return (
    <div className="grid grid-rows-[2fr_1fr_1fr] grid-cols-1 py-10">
      <div className="grid grid-rows-[3fr_1fr] grid-cols-1">
        <div className="rounded-lg border border-gray-300" style={{ background: color }}></div>
        <div className="text-xl font-normal">{color}</div>
      </div>
      <ColorRange setColor={setColor} color={color}></ColorRange>
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