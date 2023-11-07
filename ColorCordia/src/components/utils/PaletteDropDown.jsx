import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
const PaletteDropDown = ({ palettes, setColors }) => {
  const [paletteArray, setPaletteArray] = useState([])
  const [selectedPalette, setSelected] = useState('')
  const [selectedColors, setSelectedColors] = useState([])
  const [showDropDown, setShow] = useState(false)

  useEffect(() => {
    if (palettes.length < 1) {
      return
    }
    const tempArray = palettes.map(element => {
      const [paletteName, ...tempPaletteArray] = element.palette.split('-')
      return {
        name: `${paletteName} palette from #${tempPaletteArray[2]}`,
        colors: tempPaletteArray.map(color => `#${color}`),
        id: element.id
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
    setSelectedColors((paletteArray.find(element => element.id === selectedPalette)).colors)
  }, [selectedPalette])

  useEffect(() => {
    document.addEventListener('click', () => setShow(false))
  }, [showDropDown])

  if (palettes.length < 1 || paletteArray.length < 1 || selectedPalette === '') {
    return null
  }

  const changeVisibility = event => {
    event.stopPropagation()
    setShow(!showDropDown)
  }

  const handlePaletteSelection = event => {
    setSelected(event.currentTarget.id)
    changeVisibility(event)
    setColors((paletteArray.find(element => element.id === event.currentTarget.id)).colors)
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
        {paletteArray.find(element => element.id === selectedPalette).name}
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