/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPaletteById, likePalette } from "../services/palettes"
import Canvas from "./Canvas"
import { GetColorNames } from "../services/colorNames"

const SingleCommunityPaletteView = ({ palettes }) => {
  const params = useParams().id
  const [id, ...harmony] = params.split('-')
  const [palette, setPalette] = useState(null)
  const [colors, setColors] = useState()
  const [type, setType] = useState()
  const [dataUrl, setDataUrl] = useState(null)

  useEffect(() => {
    (async () => {
      if (palettes.length === 0) {
        const newPalette = await getPaletteById(id)
        const colors = await GetColorNames(newPalette.palette.substring(newPalette.palette.indexOf('-') + 1))
        setColors(colors)
        setPalette(newPalette)
        setType(newPalette.palette.split('-')[0])
      } else {
        const colourString = harmony.toString().replaceAll(',', '-')
        const colors = await GetColorNames(colourString.substring(colourString.indexOf('-') + 1))
        const tempPalette = palettes.find(palette => palette.id === id)
        setColors(colors)
        setPalette(tempPalette)
        setType(harmony[0])
      }
    })()
  }, [])


  if (!palette) {
    return null
  }

  const handleLike = () => {
    const updatedPalette = { ...palette, likes: palette.likes + 1 }
    setPalette(updatedPalette)
    likePalette(updatedPalette)
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.download = `${harmony.toString().replaceAll(',', '-')}.png`
    link.href = dataUrl
    link.click()
  }

  return (
    <>
      <h2>{`${type} pallette from ${colors[2].hex}`}</h2>
      {colors.map(color => <div key={Math.random()} style={{ background: color.hex }}>{color.hex} - {color.name}</div>)}
      <div>Created by {palette.user}</div>
      <div>{palette.likes} Likes</div>
      <button onClick={handleLike}>Like</button>
      <button onClick={downloadImage}>Download</button>
      <br />
      <Canvas palette={colors} type={type} setDataUrl={setDataUrl}></Canvas>
    </>
  )
}

export default SingleCommunityPaletteView