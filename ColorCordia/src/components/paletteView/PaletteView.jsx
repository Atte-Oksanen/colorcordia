/* eslint-disable react/prop-types */
import ColorTweaker from "./ColorTweaker"
import PaletteGenerator from "./paletteGenerator"

const PaletteView = ({ color, setColor }) => {
  return (
    <div className="grid grid-cols-[1fr_4fr]">
      <div className="p-4 my-4 border-r-2  border-gray-200">
        <ColorTweaker color={color} setColor={setColor}></ColorTweaker>
      </div>
      <div className="h-screen overflow-y-scroll">
        <PaletteGenerator color={color} setColor={setColor}></PaletteGenerator>
      </div>
    </div>
  )
}

export default PaletteView