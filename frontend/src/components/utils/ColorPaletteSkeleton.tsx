import { useState } from "react"
import { hexToRgb, rgbToHsv } from "../../utils/colorConverters"
import { ColorName, HEX } from "../../types/colorTypes"

interface props {
  type: string,
  colors: ColorName[],
  children: React.ReactNode,
  name?: string
}

const ColorPaletteSkeleton = ({ name, type, colors, children }: props) => {
  const [shownColorSpace, setColorSpace] = useState('Hex')

  const getColorCode = (hex: HEX) => {
    switch (shownColorSpace) {
      case 'Hex':
        return hex
      case 'HSV': {
        const hsv = rgbToHsv(hexToRgb(hex))
        return `${Math.round(hsv.h * 360)}°, ${Math.round(hsv.s * 100)}%, ${Math.round(hsv.v * 100)}%`
      }
      case 'RGB': {
        const rgb = hexToRgb(hex)
        return `${rgb.r}, ${rgb.g}, ${rgb.b}`
      }
    }
  }
  return (
    <div className="flex items-center justify-center md:h-screen mx-4">
      <div className="md:w-[95%] p-4 h-fit element-border rounded-lg">
        <div className="md:flex justify-between">
          <h2 className="text-2xl font-normal my-2">
            {name ? name : `${type} pallette from ${colors[2].hex}`}
          </h2>
          <div>
            <label htmlFor="shownUnit">
              Shown color system
            </label>
            <select id="shownUnit" className="dropdown mx-4 my-2" value={shownColorSpace} onChange={event => setColorSpace(event.target.value)}>
              <option>Hex</option>
              <option>RGB</option>
              <option>HSV</option>
            </select>
          </div>
        </div>
        <div className="md:grid hidden grid-rows-[10fr_1fr] h-[60vh]">
          <div className="grid grid-cols-5 rounded-md overflow-hidden border border-gray-300">
            {colors.map(color => <div key={Math.random()} style={{ background: color.hex }}></div>)}
          </div>
          <div className="grid grid-cols-5 h-fit">
            {colors.map(color => <div className="px-5 py-2 text-center" key={Math.random()}>{getColorCode(color.hex)} - {color.name}</div>)}
          </div>
        </div>
        <div>
          <div className="md:hidden grid grid-cols-1 grid-rows-5 rounded-md w-full">
            {colors.map(color => {
              return (
                <div className="grid grid-rows-[2fr_1fr] grid-cols-1" key={Math.random()}>
                  <div className="rounded-lg border border-gray-300" key={Math.random()} style={{ background: color.hex }}></div>
                  <div className="py-2 text-center" key={Math.random()}>{getColorCode(color.hex)} - {color.name}</div>
                </div>
              )
            })}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ColorPaletteSkeleton