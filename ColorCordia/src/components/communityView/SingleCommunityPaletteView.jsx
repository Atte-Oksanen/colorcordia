/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPaletteById, likePalette } from "../../services/palettes"
import PaletteCanvas from "../utils/PaletteCanvas"
import { GetColorNames } from "../../services/colorNames"
import LikeIcon from "../icons/LikeIcon"
import DownloadIcon from "../icons/DownloadIcon"

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
    <div className="w-[95%] m-auto">
      <h2 className="text-2xl font-normal my-2">
        {`${type} pallette from ${colors[2].hex}`}
      </h2>
      <div className="grid grid-cols-1 grid-rows-[15fr_1fr]">
        <div className="grid grid-cols-5 rounded-md overflow-hidden border border-gray-300">
          {colors.map(color => <div key={Math.random()} style={{ background: color.hex }}></div>)}
        </div>
        <div className="grid grid-cols-5">
          {colors.map(color => <div className="px-5 py-2 text-center" key={Math.random()}>{color.hex} - {color.name}</div>)}
        </div>
      </div>
      <div className="text-xl my-3 leading-loose">
        Created by {palette.user.username}
        <br />
        {palette.likes} Likes
      </div>
      <button className="pill-button disabled:bg-blue-400" onClick={handleLike} disabled={disableLike}>
        Like
        <div className="inline-block align-middle ml-2">
          <LikeIcon sizeClass='h-5 w-5'></LikeIcon>
        </div>
      </button>
      <button className="pill-button mx-5" onClick={downloadImage}>
        Download
        <div className="inline-block align-middle ml-2">
          <DownloadIcon sizeClass='h-5 w-5'></DownloadIcon>
        </div>
      </button>
      {!user &&
        <div className="mt-4">
          You have to be logged in to like this palette. <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to='/login'>Login</Link>
        </div>
      }
      <PaletteCanvas palette={colors} type={type} setDataUrl={setDataUrl}></PaletteCanvas>
    </div>
  )
}

export default SingleCommunityPaletteView