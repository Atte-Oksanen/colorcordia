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
  if (palette) {
    return (
      <Link className="m-2" to={`/explore/${paletteId}`}>
        <div className=" element-border rounded-md p-2 dark-grey-hover h-full active:bg-gray-200">
          <h3 className="block text-xl font-normal mb-2">{palette.name}</h3>
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
            <br />
            {palette.tags.length > 5
              ? <>{palette.tags.slice(0, 5).map(tag => <div className="text-blue-600 inline-block mr-1">#{tag}</div>)}<span className="text-blue-600">...</span></>
              : palette.tags.map(tag => <div className="text-blue-600 inline-block mr-1">#{tag}</div>)}
          </div>
          {children}
        </div>
      </Link>
    )
  }
}

export default CommunityPalette