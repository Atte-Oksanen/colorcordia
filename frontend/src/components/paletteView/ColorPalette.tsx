import { Link } from "react-router-dom"
import { Harmony } from "../../types/colorTypes"

const ColorPalette = ({ palette }: { palette: Harmony }) => {
  const paletteId = palette.harmony.toString().replace(/#/g, '').replace(/,/g, '-')
  return (
    <Link to={`/palette/${palette.type}-${paletteId}`}>
      <div className="md:grid grid-cols-[1fr_5fr] element-border rounded-md p-2 m-2 dark-grey-hover">
        <div className="flex">
          <h2 className="text-lg text-center m-auto font-normal">
            {palette.type}
          </h2>
        </div>
        <div className="grid grid-cols-1 grid-rows-[3fr_1fr]">
          <div className="grid grid-cols-5 rounded-md overflow-hidden border border-gray-300">
            {palette.harmony.map(color => <div key={Math.random()} style={{ background: color }} />)}
          </div>
          <div className="grid grid-cols-5 text-sm">
            {palette.harmony.map(color => <div key={Math.random()}>{color}</div>)}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ColorPalette