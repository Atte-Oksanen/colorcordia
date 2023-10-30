import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const ColorPalette = ({ palette }) => {
  const paletteId = palette.harmony.toString().replaceAll('#', '').replaceAll(',', '-')
  return (
    <>
      <Link to={`/palette/${palette.type}-${paletteId}`}>{palette.type}</Link>
      <div>
        {palette.harmony.map(color => <div key={Math.random()} style={{ background: color }}>{color}</div>)}
      </div>
      <Link to={`/palettes/${paletteId}`}>
        <button>More Like this</button>
      </Link>
      <br />
    </>
  )
}

export default ColorPalette