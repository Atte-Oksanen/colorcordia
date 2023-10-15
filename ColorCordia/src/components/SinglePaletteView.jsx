/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import { createPalette } from "../services/palettes"
import { useState } from "react"
import Canvas from "./Canvas"
import { getColorName } from "../utils/colorNames"

const SinglePaletteView = ({ setMessage }) => {
  const [dataUrl, setDataUrl] = useState(null)
  const id = useParams().id
  const [type, ...harmony] = id.split('-')
  const colors = harmony.map(color => {
    return {
      color: `#${color}`,
      name: getColorName(`#${color}`)
    }
  })

  const handlePaletteCreation = async () => {
    await createPalette(id)
    setMessage("palette created")
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.download = `${id}.png`
    link.href = dataUrl
    link.click()
  }
  return (
    <>
      <div>
        {`${type} pallette from ${colors[2]}`}
      </div>
      {colors.map(color => <div key={Math.random()} style={{ background: color.color }}>{color.color}-{color.name}</div>)}
      <button onClick={handlePaletteCreation}>Share</button>
      <button onClick={downloadImage}>Download</button>
      <Canvas palette={colors} type={type} setDataUrl={setDataUrl}></Canvas>
    </>

  )
}

export default SinglePaletteView