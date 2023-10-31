import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
const PaletteDropDown = ({ palettes, setColors }) => {
  const [paletteArray, setPaletteArray] = useState([])
  const [selectedPalette, setSelected] = useState('')
  const [selectedColors, setSelectedColors] = useState([])
  const [showDropDown, setShow] = useState(false)
  const selectButtonStyle = {
    padding: '0.5rem',
    background: 'white',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    border: '1px solid black',
    margin: '0'
  }
  const selectTriangleStyle = {
    display: 'inline-block',
    marginLeft: '0.5rem',
    width: 0,
    height: 0,
    borderLeft: '0.5rem solid transparent',
    borderRight: '0.5rem solid transparent',
    borderTop: '0.5rem solid #D9D9D9'
  }

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: '1fr',
    height: '1rem'
  }

  const dropDownListStyle = {
    listStyle: 'none',
    padding: '0.5rem',
    margin: '0',
    position: 'absolute',
    zIndex: '100',
    filter: 'drop-shadow(0 0 0.1rem grey)',
    width: 'fit-content',
    background: '#fcfcfc',
    height: '60vh',
    overflowY: 'scroll'
  }
  const listElementStyle = {
    padding: '0.3rem',
    margin: '0',
    border: '0',
    cursor: 'pointer'
  }

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
    const colors = (paletteArray.find(element => element.id === selectedPalette)).colors
    setSelectedColors(colors)
    setColors(colors)
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
  return (
    <div>
      <button onClick={changeVisibility} style={selectButtonStyle}>
        {paletteArray.find(element => element.id === selectedPalette).name}
        <div style={selectTriangleStyle}></div>
        <div style={gridContainerStyle}>
          <div style={{ background: selectedColors[0], gridArea: '1/1/2/2' }}></div>
          <div style={{ background: selectedColors[1], gridArea: '1/2/2/3' }}></div>
          <div style={{ background: selectedColors[2], gridArea: '1/3/2/4' }}></div>
          <div style={{ background: selectedColors[3], gridArea: '1/4/2/5' }}></div>
          <div style={{ background: selectedColors[4], gridArea: '1/5/2/6' }}></div>
        </div>
      </button>
      {showDropDown &&
        <ul style={dropDownListStyle}>
          {paletteArray.map(palette =>
            <li key={Math.random()} id={palette.id} style={listElementStyle} onClick={event => {
              setSelected(event.currentTarget.id)
              changeVisibility(event)
            }
            }>
              {palette.name}
              <br />
              <div style={gridContainerStyle}>
                <div style={{ background: palette.colors[0], gridArea: '1/1/2/2' }}></div>
                <div style={{ background: palette.colors[1], gridArea: '1/2/2/3' }}></div>
                <div style={{ background: palette.colors[2], gridArea: '1/3/2/4' }}></div>
                <div style={{ background: palette.colors[3], gridArea: '1/4/2/5' }}></div>
                <div style={{ background: palette.colors[4], gridArea: '1/5/2/6' }}></div>
              </div>
            </li>
          )}
        </ul>}
    </div>
  )
}

export default PaletteDropDown