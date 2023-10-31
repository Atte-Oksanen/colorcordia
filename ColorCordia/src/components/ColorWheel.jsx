/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import wheelStyles from './colorWheelStyling'
import { hexToRgb, hsvToRgb, rgbToHex, rgbToHsv } from '../utils/colorConverters'
import { useNavigate } from 'react-router-dom'
import { randomizeColorWheelPos } from '../utils/colorRandomizer'

const ColorWheel = ({ setColor, setMessage }) => {
  const navigate = useNavigate()
  const pointer = useRef()
  const wheel = useRef()
  const pointerBox = useRef()
  const wheelBox = useRef()
  const valueWheel = useRef()
  const [colorInput, setInput] = useState('')
  const [colorValue, setValue] = useState(100)
  const [size, setSize] = useState(0)

  useEffect(() => {
    document.addEventListener('mouseup', () => document.onmousemove = null)
    const wheelBoxTemp = wheel.current.getBoundingClientRect()
    const pointerBoxTemp = pointer.current.getBoundingClientRect()
    wheelBox.current = ({
      x: wheelBoxTemp.x + wheelBoxTemp.width / 2,
      y: wheelBoxTemp.y + wheelBoxTemp.height / 2,
      r: wheelBoxTemp.width / 2,
    })
    pointer.current.style.top = wheelBoxTemp.y + wheelBoxTemp.height / 2 - pointerBoxTemp.height / 2 + 'px'
    pointer.current.style.left = wheelBoxTemp.x + wheelBoxTemp.width / 2 - pointerBoxTemp.width / 2 + 'px'
    pointerBox.current = pointerBoxTemp
    let seedColor
    if (colorInput !== '') {
      seedColor = colorInput
    } else {
      seedColor = randomizeColorWheelPos()
    }
    movePointerOnInput(seedColor)
    setInput(seedColor)
  }, [size])

  useEffect(() => {
    window.onresize = () => setSize(Math.random())
  }, [size])

  const handlePointerClick = event => {
    if (
      Math.sqrt(
        Math.pow(event.clientX - wheelBox.current.x, 2) + Math.pow(event.clientY - wheelBox.current.y, 2)
      ) < wheelBox.current.r
    ) {
      pointer.current.style.top = event.clientY - pointerBox.current.height / 2 + 'px'
      pointer.current.style.left = event.clientX - pointerBox.current.width / 2 + 'px'
    }
    document.onmousemove = pointerDrag
  }

  const pointerDrag = event => {
    event.preventDefault()
    movePointer(event.clientX, event.clientY)
  }

  const handleTouchStart = event => {
    movePointer(event.touches[0].clientX, event.touches[0].clientY)
  }

  const handleColorInput = (event) => {
    setInput(event.target.value)
    movePointerOnInput(event.target.value)
  }

  const movePointerOnInput = hex => {
    const rgb = hexToRgb(hex)
    if (rgb) {
      pointer.current.style.backgroundColor = hex
      const hsv = (rgbToHsv(rgb))
      const coords = { ...hsv, h: hsv.h * 360, s: hsv.s * wheelBox.current.r }
      const theta = coords.h * Math.PI / 180
      pointer.current.style.left = coords.s * Math.cos(theta) + wheelBox.current.x - pointerBox.current.width + 'px'
      pointer.current.style.top = coords.s * Math.sin(theta) + wheelBox.current.y - pointerBox.current.height + 'px'
    }
  }

  const movePointer = (clientX, clientY) => {
    const pointerElmt = pointer.current.getBoundingClientRect()
    const pointerPosition = {
      x: pointerElmt.x + pointerElmt.width / 2,
      y: pointerElmt.y + pointerElmt.height / 2,
    }
    if (
      (Math.sqrt(Math.pow(clientX - wheelBox.current.x, 2) + Math.pow(clientY - wheelBox.current.y, 2)) + 10) <
      wheelBox.current.r
    ) {
      pointer.current.style.top = clientY - pointerBox.current.height / 2 + 'px'
      pointer.current.style.left = clientX - pointerBox.current.width / 2 + 'px'
    }
    let degs = Math.atan2(pointerPosition.y - wheelBox.current.y, pointerPosition.x - wheelBox.current.x) * (180 / Math.PI)
    if (degs < 0) {
      degs = degs + 360
    }
    let saturationTemp = Math.sqrt(
      Math.pow(pointerPosition.x - wheelBox.current.x, 2) + Math.pow(pointerPosition.y - wheelBox.current.y, 2)
    ) / wheelBox.current.r * 1.1
    if (saturationTemp > 1) {
      saturationTemp = 1
    }
    const hsvTemp = {
      h: degs / 360,
      s: saturationTemp,
      v: colorValue / 100,
    }
    const pickedColor = rgbToHex(hsvToRgb(hsvTemp))
    pointer.current.style.backgroundColor = pickedColor
    setInput(pickedColor)
  }

  const handleColorSubmit = event => {
    event.preventDefault()
    if (checkColorInput(colorInput)) {
      setColor(colorInput)
      navigate(`/palettes/`)
    } else {
      setMessage('Invalid input')
    }
  }

  const checkColorInput = input => {
    return hexToRgb(input)
  }

  const handleSliderInput = event => {
    setValue(event.target.value)
    valueWheel.current.style.opacity = 1 - event.target.value / 100
    if (event.target.value === '0') {
      event.target.value += 1
    } else if (event.target.value >= 100) {
      event.target.value = 100
    }
    const currentHsv = rgbToHsv(hexToRgb(colorInput))
    const newHex = rgbToHex(hsvToRgb({ ...currentHsv, v: (event.target.value / 100) }))
    pointer.current.style.backgroundColor = newHex
    setInput(newHex)
  }

  return (
    <div style={{ width: 'fit-content', margin: 'auto' }}>
      <div style={{ ...wheelStyles.wrapperStyle }}>
        <div ref={wheel} style={wheelStyles.bottomWheelStyle}></div>
        <div style={wheelStyles.topWheelStyle}></div>
        <div
          ref={pointer}
          style={wheelStyles.pointerStyle}
          onMouseDown={event => handlePointerClick(event)}
          onMouseUp={() => document.onmousemove = null}
          onTouchStart={event => {
            event.stopPropagation()
          }}
          onTouchMove={event => handleTouchStart(event)}
        ></div>
        <div style={wheelStyles.valueWheelStyle} ref={valueWheel}>
        </div>
        V<input type="range" max={100} value={colorValue} onChange={handleSliderInput} />
        {colorValue}
      </div >
      <form onSubmit={handleColorSubmit}>
        <input type='text' value={colorInput} onChange={handleColorInput} />
        <button type='submit'>Create palettes</button>
      </form>
    </div>
  )
}

export default ColorWheel
