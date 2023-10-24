/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPaletteById, likePalette } from "../services/palettes"
import Canvas from "./Canvas"
import { GetColorNames } from "../services/colorNames"

const SingleCommunityPaletteView = ({ palettes, user, setUser }) => {
  const params = useParams().id
  const [id, ...harmony] = params.split('-')
  const [palette, setPalette] = useState(null)
  const [colors, setColors] = useState()
  const [type, setType] = useState()
  const [dataUrl, setDataUrl] = useState(null)
  const [disableLike, setDisableLike] = useState(false)

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

  useEffect(() => {
    (async () => {
      if (!user) {
        return setDisableLike(true)
      }
      if (user && palette && disableLike !== true) {
        if (user.likedPosts.find(element => element === palette.id)) {
          setDisableLike(true)
        }
      }
    })()
  }, [palette, user])


  if (!palette) {
    return null
  }

  const handleLike = () => {
    const updatedPalette = { ...palette, likes: palette.likes + 1 }
    const updatedUser = { ...user, likedPosts: user.likedPosts.concat(palette.id) }
    setUser(updatedUser)
    setPalette(updatedPalette)
    likePalette(updatedPalette)
    setDisableLike(true)
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
      <div>Created by {palette.user.username}</div>
      <div>{palette.likes} Likes</div>
      <button onClick={handleLike} disabled={disableLike} >Like</button>
      <button onClick={downloadImage}>Download</button>
      <br />
      <Canvas palette={colors} type={type} setDataUrl={setDataUrl}></Canvas>
    </>
  )
}

export default SingleCommunityPaletteView