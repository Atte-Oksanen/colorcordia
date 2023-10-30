/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
const CommunityPalette = (props) => {
  const [type, ...colorHarmony] = props.palette.palette.split('-')
  const colors = colorHarmony.map(color => `#${color}`)
  const paletteId = `${props.palette.id}-`.concat(type).concat('-').concat(colorHarmony).toString().replaceAll(',', '-')
  return (
    <div>
      <h3><Link to={`/explore/${paletteId}`}>{type} from {colors[2]}</Link></h3>
      {colors.map(color => <div key={Math.random()} style={{ background: color }}>{color}</div>)}
      <div>Created by {props.palette.user.username}</div>
      <div>Likes {props.palette.likes}</div>
      {props.children}
    </div>
  )
}

export default CommunityPalette