import { useParams } from "react-router-dom"

const SinglePaletteView = () => {
  const [type, ...harmony] = useParams().id.split('-')
  const colors = harmony.map(color => `#${color}`)
  return (
    <>
      <div>
        {`${type} pallette from ${colors[2]}`}
      </div>
      {colors.map(color => <div key={Math.random()} style={{ background: color }}>{color}</div>)}
    </>

  )
}

export default SinglePaletteView