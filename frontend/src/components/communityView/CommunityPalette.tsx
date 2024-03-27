import { Link } from "react-router-dom"
import { Palette } from "../../types/componentTypes"

interface props {
  palette: Palette,
  children?: React.ReactNode
}

const CommunityPalette = ({ palette, children }: props) => {
  const [type, ...colorHarmony] = palette.palette.split('-')
  const colors = colorHarmony.map(color => `#${color}`)
  const paletteId: string = `${palette.id}-${type}-${colorHarmony.join('-')}`
  return (
    <Link className="m-2" to={`/explore/${paletteId}`}>
      <div className="bg-gray-200 rounded-md p-2 dark-grey-hover h-full">
        <h3 className="block text-xl font-normal mb-2">{type} palette from {colors[2]}</h3>
        <div className="md:grid grid-cols-1 grid-rows-[8fr_1fr]">
          <div className="grid grid-cols-5 rounded-md overflow-hidden border border-gray-300 w-full h-24 md:h-auto">
            {colors.map(color => <div key={Math.random()} style={{ background: color }}></div>)}
          </div>
          <div className="md:grid grid-cols-5 hidden">
            {colors.map(color => <div key={Math.random()}>{color}</div>)}
          </div>
        </div>
        <div className="leading-loose">
          Created by {palette.user.username}
          <br />
          Likes {palette.likes}
        </div>
        {children}
      </div>
    </Link>
  )
}

export default CommunityPalette