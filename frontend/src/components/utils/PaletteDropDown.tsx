import { useEffect, useState } from "react"
import LoadingComponent from "./LoadingComponent"
import { Palette, PaletteWithColors } from "../../types/componentTypes"

interface props {
  palettes: Palette[]
  setColors: React.Dispatch<React.SetStateAction<string[]>>
}

const PaletteDropDown = ({ palettes, setColors }: props) => {
  const [paletteArray, setPaletteArray] = useState<PaletteWithColors[]>([])
  const [selectedPalette, setSelected] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [showDropDown, setShow] = useState(false)

  useEffect(() => {
    if (palettes.length < 1) {
      return
    }
    const tempArray: PaletteWithColors[] = palettes.map(element => {
      const [paletteName, ...tempPaletteArray] = element.palette.split('-')
      return {
        name: `${paletteName} palette from #${tempPaletteArray[2]}`,
        colors: tempPaletteArray.map(color => `#${color}`),
        id: element.id ? element.id : ''
      }
    })
    setPaletteArray(tempArray)
    if (selectedPalette === '') {
      setSelected(tempArray[0].id)
    }
  }, [palettes])

  useEffect(() => {
    if (palettes.length < 1 || paletteArray.length < 1 || selectedPalette === '') {
      return
    }
    const foundColors = paletteArray.find(element => element.id === selectedPalette)
    if (foundColors) {
      setSelectedColors(foundColors.colors)
    }
  }, [selectedPalette])

  useEffect(() => {
    document.addEventListener('click', () => setShow(false))
  }, [showDropDown])

  if (palettes.length < 1 || paletteArray.length < 1 || selectedPalette === '') {
    return (
      <div className="h-fit m-auto">
        <LoadingComponent></LoadingComponent>
      </div>
    )
  }

  const changeVisibility = (event: React.MouseEvent<HTMLLIElement | HTMLButtonElement>) => {
    event.stopPropagation()
    setShow(!showDropDown)
  }

  const handlePaletteSelection = (event: React.MouseEvent<HTMLLIElement>) => {
    setSelected(event.currentTarget.id)
    changeVisibility(event)
    const foundColors = paletteArray.find(element => element.id === event.currentTarget.id)
    if (foundColors) {
      setColors(foundColors.colors)
    }
  }
  return (
    <div className="relative">
      {showDropDown &&
        <ul className="p-2 absolute bottom-full z-50 drop-shadow-lg w-fit bg-gray-100 h-fit max-h-[60vh] overflow-y-auto">
          {paletteArray.map(palette =>
            <li className="p-1 cursor-pointer dark-grey-hover"
              key={Math.random()} id={palette.id} onClick={handlePaletteSelection}>
              {palette.name}
              <br />
              <div className="grid grid-cols-5 grid-rows-1 h-4">
                <div style={{ background: palette.colors[0] }}></div>
                <div style={{ background: palette.colors[1] }}></div>
                <div style={{ background: palette.colors[2] }}></div>
                <div style={{ background: palette.colors[3] }}></div>
                <div style={{ background: palette.colors[4] }}></div>
              </div>
            </li>
          )}
        </ul>}
      <button className="p-2 dark-grey-hover bg-white rounded-lg cursor-pointer border border-black"
        onClick={changeVisibility}>
        {paletteArray.find(element => element.id === selectedPalette)?.name}
        <div className="inline-block ml-2 w-0 h-0"
          style={{ borderLeft: '0.5rem solid transparent', borderRight: '0.5rem solid transparent', borderTop: '0.5rem solid #D9D9D9' }}></div>
        <div className="grid grid-cols-5 grid-rows-1 h-4">
          <div style={{ background: selectedColors[0] }}></div>
          <div style={{ background: selectedColors[1] }}></div>
          <div style={{ background: selectedColors[2] }}></div>
          <div style={{ background: selectedColors[3] }}></div>
          <div style={{ background: selectedColors[4] }}></div>
        </div>
      </button>
    </div>
  )
}

export default PaletteDropDown