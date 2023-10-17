/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import { createPalette } from "../services/palettes"
import { useEffect, useState } from "react"
import Canvas from "./Canvas"
import { GetColorNames } from "../services/colorNames"

const SinglePaletteView = ({ setMessage }) => {
  const [dataUrl, setDataUrl] = useState(null)
  const id = useParams().id
  const type = id.split('-')[0]
  const [colors, setColors] = useState(null)

  useEffect(() => {
    (async () => {
      const colors = await GetColorNames(id.substring(id.indexOf('-') + 1))
      setColors(colors)
    })()
  }, [])

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

  if (!colors) {
    return null
  }
  return (
    <>
      <div>
        {`${type} pallette from ${colors[2].hex}`}
      </div>
      {colors.map(color => <div key={Math.random()} style={{ background: color.hex }}>{color.hex}-{color.name}</div>)}
      <button onClick={handlePaletteCreation}>Share</button>
      <button onClick={downloadImage}>Download</button>
      <Canvas palette={colors} type={type} setDataUrl={setDataUrl}></Canvas>
    </>

  )
}

export default SinglePaletteView