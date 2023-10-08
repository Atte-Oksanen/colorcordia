import { useParams } from "react-router-dom"
import PaletteGenerator from "./paletteGenerator"

const FollowUpPalettes = () => {
  const id = useParams().id
  const pallette = id.split('-').map(color => `#${color}`)
  return (
    <div>
      {pallette.map(color => <PaletteGenerator key={Math.random()} color={color}></PaletteGenerator>)}
    </div>
  )
}

export default FollowUpPalettes