import { Link, useParams } from "react-router-dom"
import { createPalette } from "../../services/palettes"
import { useEffect, useState } from "react"
import { GetColorNames } from "../../services/colorNames"
import ShareIcon from "../icons/ShareIcon"
import NextIcon from "../icons/NextIcon"
import DownloadablePalette from "../utils/DownloadablePalette"
import ColorPaletteSkeleton from "../utils/ColorPaletteSkeleton"
import LoadingComponent from "../utils/LoadingComponent"

const SinglePaletteView = ({ setMessage, user, communityPalettes, setPalettes }) => {
  const id = useParams().id
  const [type, ...colorsForId] = id.split('-')
  const [colors, setColors] = useState(null)
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
    try {
      const newPalette = await createPalette(id)
      setPalettes(communityPalettes.concat(newPalette))
    } catch (error) {
      console.log(error)
      return
    }
    setMessage({ text: "palette created", warning: false })
    setButtonDisabled(true)
  }

  if (!colors) {
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
          <Link to={`/palettes/${colorsForId.toString().replaceAll(',', '-')}`}>
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