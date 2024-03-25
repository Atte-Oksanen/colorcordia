import { useParams } from "react-router-dom"
import PaletteGenerator from "./paletteGenerator"

const FollowUpPalettes = () => {
  const id = useParams().id
  const pallette = id.split('-').map(color => `#${color}`)
  return (
    <div className="my-5">
      {pallette.map(color => {
        return (
          <div className="border-b-2 border-gray-500 px-1 py-4 m-3" key={Math.random()}>
            <h3 className="mx-6 text-xl font-normal">{color}</h3>
            <PaletteGenerator key={Math.random()} color={color}></PaletteGenerator>
          </div>
        )
      })}
    </div>
  )
}

export default FollowUpPalettes