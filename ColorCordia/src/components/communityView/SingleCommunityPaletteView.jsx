/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPaletteById, likePalette } from "../../services/palettes"
import { GetColorNames } from "../../services/colorNames"
import LikeIcon from "../icons/LikeIcon"
import ColorPaletteSkeleton from "../utils/ColorPaletteSkeleton"
import DownloadablePalette from "../utils/DownloadablePalette"

const SingleCommunityPaletteView = ({ palettes, user, setUser }) => {
  const params = useParams().id
  const [id, ...harmony] = params.split('-')
  const [palette, setPalette] = useState(null)
  const [colors, setColors] = useState()
  const [type, setType] = useState()
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


  return (

    <ColorPaletteSkeleton colors={colors} type={type}>
      <div className="text-xl my-3 leading-loose">
        Created by {palette.user.username}
        <br />
        {palette.likes} Likes
      </div>
      <button className="pill-button disabled:bg-blue-400 mr-5" onClick={handleLike} disabled={disableLike}>
        Like
        <div className="inline-block align-middle ml-2">
          <LikeIcon sizeClass='h-5 w-5'></LikeIcon>
        </div>
      </button>
      <DownloadablePalette palette={colors} type={type} ></DownloadablePalette>
      {!user &&
        <div className="mt-4">
          You have to be logged in to like this palette. <Link className="link-text" to='/login'>Login</Link>
        </div>
      }
    </ColorPaletteSkeleton>
  )
}

export default SingleCommunityPaletteView