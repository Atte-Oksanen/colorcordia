/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom"
import { createPalette } from "../../services/palettes"
import { useEffect, useState } from "react"
import PaletteCanvas from "../utils/PaletteCanvas"
import { GetColorNames } from "../../services/colorNames"
import ShareIcon from "../icons/ShareIcon"
import NextIcon from "../icons/NextIcon"
import DownloadIcon from "../icons/DownloadIcon"

const SinglePaletteView = ({ setMessage, user, communityPalettes, setPalettes }) => {
  const [dataUrl, setDataUrl] = useState(null)
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
    setMessage("palette created")
    setButtonDisabled(true)
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.download = `${id}.png`
    link.href = dataUrl
    link.click()
  }

  if (!colors) {
    return null
  }
  return (
    <div className="w-[95%] m-auto">
      <h2 className="text-2xl font-normal my-2">
        {`${type} pallette from ${colors[2].hex}`}
      </h2>
      <div className="grid grid-cols-1 grid-rows-[15fr_1fr]">
        <div className="grid grid-cols-5 rounded-md overflow-hidden border border-gray-200">
          {colors.map(color => <div key={Math.random()} style={{ background: color.hex }}></div>)}
        </div>
        <div className="grid grid-cols-5">
          {colors.map(color => <div className="px-5 py-2 text-center" key={Math.random()}>{color.hex} - {color.name}</div>)}
        </div>
      </div>
      <button className="pill-button mr-5 disabled:bg-blue-400" disabled={shareButtonDisabled} onClick={handlePaletteCreation}>
        Share
        <div className="inline-block align-middle ml-2">
          <ShareIcon sizeClass='h-5 w-5'></ShareIcon>
        </div>
      </button>
      <button className="pill-button " onClick={downloadImage}>
        Download
        <div className="inline-block align-middle ml-2">
          <DownloadIcon sizeClass='h-5 w-5'></DownloadIcon>
        </div>
      </button>
      <button className="pill-button-empty mx-5">
        <Link to={`/palettes/${colorsForId.toString().replaceAll(',', '-')}`}>
          Find derivative palettes
          <div className="inline-block align-middle ml-2">
            <NextIcon sizeClass='h-5 w-5'></NextIcon>
          </div>
        </Link>
      </button>
      {!user &&
        <div className="mt-4">
          You have to be logged in to share this palette. <Link className="link-text" to='/login'>Login</Link>
        </div>
      }
      <PaletteCanvas palette={colors} type={type} setDataUrl={setDataUrl}></PaletteCanvas>
    </div>

  )
}

export default SinglePaletteView