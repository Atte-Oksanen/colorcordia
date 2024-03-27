import { Link, useParams } from "react-router-dom"
import { createPalette } from "../../services/palettes"
import { useEffect, useState } from "react"
import { GetColorNames } from "../../services/colorNames"
import ShareIcon from "../icons/ShareIcon"
import NextIcon from "../icons/NextIcon"
import DownloadablePalette from "../utils/DownloadablePalette"
import ColorPaletteSkeleton from "../utils/ColorPaletteSkeleton"
import LoadingComponent from "../utils/LoadingComponent"
import { Message, Palette } from "../../types/componentTypes"
import { User } from "../../types/userManagementTypes"
import { ColorName } from "../../types/colorTypes"

interface props {
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>
  user: User | null,
  communityPalettes: Palette[]
  setPalettes: React.Dispatch<React.SetStateAction<Palette[]>>
  setUser: React.Dispatch<React.SetStateAction<User | null>>

}

const SinglePaletteView = ({ setMessage, user, setUser, communityPalettes, setPalettes }: props) => {
  const id = useParams().id
  if (!id) {
    return null
  }
  const [type, ...colorsForId] = id.split('-')
  const [colors, setColors] = useState<ColorName[]>([])
  const [shareButtonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    (async () => {
      const colors = await GetColorNames(id.substring(id.indexOf('-') + 1))
      setColors(colors)
    })()
    if (!user) {
      setButtonDisabled(true)
    }
  }, [])

  const handlePaletteCreation = async () => {
    if (user && user.palettes) {
      try {
        const newPalette = await createPalette(id, user)
        setPalettes(communityPalettes.concat(newPalette))
        const updatedPalettes = user.palettes.concat(newPalette)
        setUser({ ...user, palettes: updatedPalettes })
      } catch (error) {
        console.log(error)
        return
      }
      setMessage({ text: "palette created", warning: false })
      setButtonDisabled(true)
    }
  }

  if (colors.length === 0) {
    return (
      <div className="h-full flex">
        <LoadingComponent></LoadingComponent>
      </div>
    )
  }
  return (
    <ColorPaletteSkeleton type={type} colors={colors}>
      <div className="md:block grid grid-cols-2 gap-2 mx-1 md:h-fit">
        <button className="pill-button md:mr-5 disabled:bg-blue-400" disabled={shareButtonDisabled} onClick={handlePaletteCreation}>
          Share
          <div className="inline-block align-middle ml-2">
            <ShareIcon sizeClass='h-5 w-5'></ShareIcon>
          </div>
        </button>
        <DownloadablePalette palette={colors} type={type}></DownloadablePalette>
        <button className="pill-button-empty md:mx-5 col-span-2">
          <Link to={`/palettes/${colorsForId.toString().replace(/,/g, '-')}`}>
            Derivative palettes
            <div className="inline-block align-middle ml-2">
              <NextIcon sizeClass='h-5 w-5'></NextIcon>
            </div>
          </Link>
        </button>
      </div>
      {!user &&
        <div className="mt-4">
          You have to be logged in to share this palette. <Link className="link-text" to='/login'>Login</Link>
        </div>
      }
    </ColorPaletteSkeleton>
  )
}

export default SinglePaletteView