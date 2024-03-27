import { Link } from "react-router-dom"
import NextIcon from "../icons/NextIcon"
import ColorRange from "../utils/ColorRange"
import LoadingComponent from "../utils/LoadingComponent"
import { HEX } from "../../types/colorTypes"

interface props {
  color: HEX,
  setColor: React.Dispatch<React.SetStateAction<string | null>>
}

const ColorTweaker = ({ color, setColor }: props) => {
  if (!color) {
    return (
      <div className="h-full flex">
        <LoadingComponent></LoadingComponent>
      </div>
    )
  }
  return (
    <div className="grid md:grid-rows-[2fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] grid-cols-1 md:py-10">
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