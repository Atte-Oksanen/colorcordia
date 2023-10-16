/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPalettes, likePalette } from "../services/palettes"
import Canvas from "./Canvas"
import { hexToRgb } from "../utils/colorConverters"
import axios from "axios"

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
          name: "light blue"
        }
      }))
      setType(typeTemp)

    })()
  }, [id, palettes])

  useEffect(() => {
    getColorName("#a77aff")
  })

  const getColorName = async hex => {
    const colors = (await axios.get("http://localhost:3000/colors")).data

    const colorsWithRgb = colors.map(color => {
      return { ...color, rgb: hexToRgb(color.hex) }
    })
    const rgb = hexToRgb(hex)
    let closestName = colors[0]
    let distanceToName = Math.sqrt(Math.pow(rgb.r - colorsWithRgb[0].rgb.r, 2) + Math.pow(rgb.g - colorsWithRgb[0].rgb.g, 2) + Math.pow(rgb.b - colorsWithRgb[0].rgb.b, 2))
    for (let index = 1; index < colorsWithRgb.length; index++) {
      let newDistance = Math.pow(Math.pow(rgb.r - colorsWithRgb[index].rgb.r, 2) + Math.pow(rgb.g - colorsWithRgb[index].rgb.g, 2) + Math.pow(rgb.b - colorsWithRgb[index].rgb.b, 2), 0.5)
      if (newDistance < distanceToName) {
        distanceToName = newDistance
        closestName = colors[index]
      }
    }

    console.log(closestName)
    return closestName.name
  }

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