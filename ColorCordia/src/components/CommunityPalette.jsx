/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
const CommunityPalette = ({ palette }) => {
  const [type, ...colorHarmony] = palette.palette.split('-')
  const colors = colorHarmony.map(color => `#${color}`)
  const paletteId = `${palette.id}-`.concat(type).concat('-').concat(colorHarmony).toString().replaceAll(',', '-')
  return (
    <div>
      <h3><Link to={`/explore/${paletteId}`}>{type} from {colors[2]}</Link></h3>
      {colors.map(color => <div key={Math.random()} style={{ background: color }}>{color}</div>)}
      <div>Created by {palette.user}</div>
      <div>Likes {palette.likes}</div>
    </div>
  )
}

export default CommunityPalette