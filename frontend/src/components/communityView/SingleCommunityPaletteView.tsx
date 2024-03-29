import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPaletteById, likePalette } from "../../services/palettes"
import { GetColorNames } from "../../services/colorNames"
import LikeIcon from "../icons/LikeIcon"
import ColorPaletteSkeleton from "../utils/ColorPaletteSkeleton"
import DownloadablePalette from "../utils/DownloadablePalette"
import LoadingComponent from "../utils/LoadingComponent"
import { Palette } from "../../types/componentTypes"
import { User } from "../../types/userManagementTypes"
import { ColorName } from "../../types/colorTypes"

interface props {
  palettes: Palette[],
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const SingleCommunityPaletteView = ({ palettes, user, setUser }: props) => {
  const params = useParams().id
  if (!params) {
    return null
  }
  const [id, ...harmony] = params.split('-')
  const [palette, setPalette] = useState<Palette | null>(null)
  const [colors, setColors] = useState<ColorName[]>([])
  const [type, setType] = useState<string>('')
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
        const colorString = harmony.toString().replace(/,/g, '-')
        const colors = await GetColorNames(colorString.substring(colorString.indexOf('-') + 1))
        const tempPalette = palettes.find(palette => palette.id === id)
        if (tempPalette) {
          setColors(colors)
          setPalette(tempPalette)
          setType(harmony[0])
        }
      }

    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (!user) {
        return setDisableLike(true)
      }
      if (user.likedPosts && palette) {
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
    if (user && user.likedPosts && palette.id) {
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
  }


  return (
    <ColorPaletteSkeleton colors={colors} type={type} name={palette.name}>
      <div className="text-xl my-3 leading-loose">
        Created by {palette.user.username}
        <br />
        {palette.likes} Likes
        <br />
        {palette.tags.length > 5
          ? <>{palette.tags.slice(0, 5).map(tag => <div className="text-blue-600 inline-block mr-1 text-base">#{tag}</div>)}<span className="text-blue-600">...</span></>
          : palette.tags.map(tag => <div className="text-blue-600 inline-block mr-1 text-base">#{tag}</div>)}
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