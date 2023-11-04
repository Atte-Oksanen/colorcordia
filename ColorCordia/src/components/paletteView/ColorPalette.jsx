import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const ColorPalette = ({ palette }) => {
  const paletteId = palette.harmony.toString().replaceAll('#', '').replaceAll(',', '-')
  return (
    <Link to={`/palette/${palette.type}-${paletteId}`}>
      <div className="grid grid-cols-[1fr_5fr] bg-gray-200 rounded-md py-1 px-2 m-2 dark-grey-hover">
        <div className="flex">
          <h2 className="text-lg text-center m-auto">
            {palette.type}
          </h2>
        </div>
        <div className="grid grid-cols-1 grid-rows-[3fr_1fr]">
          <div className="grid grid-cols-5 rounded-md overflow-hidden">
            {palette.harmony.map(color => <div key={Math.random()} style={{ background: color }} />)}
          </div>
          <div className="grid grid-cols-5">
            {palette.harmony.map(color => <div key={Math.random()}>{color}</div>)}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ColorPalette