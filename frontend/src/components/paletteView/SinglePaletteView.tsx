import { Link, useParams } from "react-router-dom"
import { createPalette } from "../../services/palettes"
import { useEffect, useRef, useState } from "react"
import { GetColorNames, getColorAttributes } from "../../services/colorNames"
import ShareIcon from "../icons/ShareIcon"
import NextIcon from "../icons/NextIcon"
import DownloadablePalette from "../utils/DownloadablePalette"
import ColorPaletteSkeleton from "../utils/ColorPaletteSkeleton"
import LoadingComponent from "../utils/LoadingComponent"
import { Message, Palette } from "../../types/componentTypes"
import { User } from "../../types/userManagementTypes"
import { ColorName } from "../../types/colorTypes"
import { AxiosError } from "axios"

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
  const [paletteName, setPaletteName] = useState('')
  const [tagString, setTagString] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    (async () => {
      const colors = await GetColorNames(id.substring(id.indexOf('-') + 1))
      setColors(colors)
    })()
    if (!user) {
      setButtonDisabled(true)
    }
    if (modalRef.current) {
      modalRef.current.showModal()
    }
  }, [])

  const handlePaletteCreation = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (user && user.palettes) {
      try {
        const newPalette = await createPalette({
          palette: id,
          name: paletteName,
          tags: tags
        }, user)
        setPalettes(communityPalettes.concat(newPalette))
        const updatedPalettes = user.palettes.concat(newPalette)
        setUser({ ...user, palettes: updatedPalettes })
        setMessage({ text: "palette created", warning: false })
        setButtonDisabled(true)
      } catch (error) {
        if (error instanceof AxiosError) {
          setMessage({ text: error.response.data.message, warning: true })
        }
      }
      closeShareModal(event)
    }
  }

  if (colors.length === 0) {
    return (
      <div className="h-full flex">
        <LoadingComponent></LoadingComponent>
      </div>
    )
  }

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagString(event.target.value)
    if (event.target.value.substring(event.target.value.length - 2).match(/,\s/g)) {
      setTagString('')
      setTags(Array.from(new Set(tags.concat(event.target.value.trim().match(/[a-zA-Z0-9_-]/g).join('')))))
    }
  }

  const handleTagDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setTags(tags.filter(tag => tag !== event.currentTarget.value))
  }

  const handleTagGeneration = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const paletteAttributes: string[] = await getColorAttributes(colors.map(color => color.hex))
    setTags(paletteAttributes)
  }

  const handleNameGeneration = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const colorAttributes = await getColorAttributes(colors.map(color => color.hex))
    setPaletteName(`${colorAttributes[Math.floor(colorAttributes.length * Math.random())]} ${type} from ${colors[2].name}`)
  }

  const openShareModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal()
    }
  }

  const closeShareModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (modalRef.current) {
      modalRef.current.close()
    }
  }

  return (
    <ColorPaletteSkeleton type={type} colors={colors}>
      <dialog ref={modalRef} className="md:w-[30vw] w-[85vw] overflow-y-auto h-fit p-8 rounded-lg">
        <h3 className="text-2xl font-normal mb-4">Share palette</h3>
        <form className="h-full">
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="paletteName" className="text-lg font-normal">Palette name</label>
            <button onClick={handleNameGeneration} className="pill-button text-sm">Generate name automatically</button>
          </div>
          <input id="paletteName" value={paletteName} onChange={event => setPaletteName(event.target.value)} type="text" className="text-input w-full mb-5" />
          <div className="flex md:justify-between justify-around items-center mb-1">
            <label htmlFor="paletteTags" className="text-lg font-normal">Tags</label>
            <button onClick={handleTagGeneration} className="pill-button text-sm md:ml-0 ml-4">Generate tags automatically</button>
          </div>
          <div className="text-sm text-gray-600 italic">Use commas to separate tags</div>
          <input className="text-input w-full h-10" value={tagString} onChange={handleTagChange} />
          <div className="h-fit p-2">
            {tags.map(tag =>
              <button
                key={tag}
                onClick={handleTagDelete}
                value={tag}
                className="pill-button-empty inline-block hover:pill-button-delete text-xs mr-2 mb-2"
              >
                {tag}
              </button>)}
          </div>
          <div className="flex justify-end">
            <button className="pill-button-empty mr-3" onClick={closeShareModal}>Cancel</button>
            <button className="pill-button" onClick={handlePaletteCreation}>
              Share
              <div className="inline-block align-middle ml-2">
                <ShareIcon sizeClass='h-5 w-5'></ShareIcon>
              </div>
            </button>
          </div>
        </form>
      </dialog >
      <div className="md:block grid grid-cols-2 gap-2 mx-1 md:h-fit">
        <button className="pill-button md:mr-5 disabled:bg-blue-400" disabled={shareButtonDisabled} onClick={openShareModal}>
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
      {
        !user &&
        <div className="mt-4">
          You have to be logged in to share this palette. <Link className="link-text" to='/login'>Login</Link>
        </div>
      }
    </ColorPaletteSkeleton >
  )
}

export default SinglePaletteView