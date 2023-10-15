/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPalettes, likePalette } from "../services/palettes"
import Canvas from "./Canvas"
import { getColorName } from "../utils/colorNames"

const SingleCommunityPaletteView = ({ palettes }) => {
  const params = useParams().id
  const [id, ...harmony] = params.split('-')
  const [palette, setPalette] = useState(null)
  const [colors, setColors] = useState()
  const [type, setType] = useState()
  const [dataUrl, setDataUrl] = useState(null)

  useEffect(() => {
    (async () => {
      let paletteTemp
      if (palettes.length < 1) {
        const palettesTemp = await getPalettes()
        paletteTemp = palettesTemp.find(palette => palette.id === Number(id))
      }
      if (palettes.length > 0) {
        paletteTemp = palettes.find(palette => palette.id === Number(id))
      }
      const [typeTemp, ...colorsTemp] = paletteTemp.palette.split('-')
      setPalette(paletteTemp)
      setColors(colorsTemp.map(color => {
        return {
          color: `#${color}`,
          name: getColorName(`#${color}`)
        }
      }))
      setType(typeTemp)

    })()
  }, [id, palettes])



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
      <h2>{`${type} pallette from ${colors[2]}`}</h2>
      {colors.map(color => <div key={Math.random()} style={{ background: color.color }}>{color.color} - {color.name}</div>)}
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