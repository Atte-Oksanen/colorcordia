import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPaletteById, likePalette } from "../../services/palettes"
import { GetColorNames } from "../../services/colorNames"
import LikeIcon from "../icons/LikeIcon"
import ColorPaletteSkeleton from "../utils/ColorPaletteSkeleton"
import DownloadablePalette from "../utils/DownloadablePalette"
import LoadingComponent from "../utils/LoadingComponent"

const SingleCommunityPaletteView = ({ palettes, user, setUser }) => {
  const params = useParams().id
  const [id, ...harmony] = params.split('-')
  const [palette, setPalette] = useState(null)
  const [colors, setColors] = useState()
  const [type, setType] = useState()
  const [disableLike, setDisableLike] = useState(false)
  const [alreadyLiked, setLiked] = useState(false)
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
      if (user && palette) {
        if (user.likedPosts.find(element => element === palette.id)) {
          setLiked(true)
        }
      }
      setDisableLike(false)
    })()
  }, [palette, user, alreadyLiked])


  if (!palette) {
    return (
      <div className="h-full flex">
        <LoadingComponent></LoadingComponent>
      </div>
    )
  }

  const handleLike = () => {
    let updatedPalette
    let updatedUser
    if (alreadyLiked) {
      updatedPalette = { ...palette, likes: palette.likes - 1 }
      updatedUser = { ...user, likedPosts: user.likedPosts.filter(element => element !== palette.id) }
      setLiked(false)
    } else {
      updatedPalette = { ...palette, likes: palette.likes + 1 }
      updatedUser = { ...user, likedPosts: user.likedPosts.concat(palette.id) }
      setLiked(true)
    }
    setUser(updatedUser)
    setPalette(updatedPalette)
    likePalette(updatedPalette)
  }


  return (
    <ColorPaletteSkeleton colors={colors} type={type}>
      <div className="text-xl my-3 leading-loose">
        Created by {palette.user.username}
        <br />
        {palette.likes} Likes
      </div>
      <button className={`pill-button ${alreadyLiked ? 'pill-button-empty' : 'pill-button'} disabled:bg-blue-400 mr-5`} onClick={() => handleLike()} disabled={disableLike}>
        {alreadyLiked ? 'Unlike' : 'Like'}
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