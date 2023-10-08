/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import wheelStyles from './colorWheelStyling'
import { hexToRgb, hsvToRgb, rgbToHex, rgbToHsv } from '../utils/colorConverters'
import { useNavigate } from 'react-router-dom'

const ColorWheel = ({ setColor }) => {
  const navigate = useNavigate()
  const pointer = useRef()
  const wheel = useRef()
  const [pointerBox, setPointerBox] = useState('')
  const [wheelBox, setWheelBox] = useState({})
  const [colorInput, setInput] = useState('')

  useEffect(() => {
    document.addEventListener('mouseup', () => document.onmousemove = null)
    const wheelBoxTemp = wheel.current.getBoundingClientRect()
    const pointerBoxTemp = pointer.current.getBoundingClientRect()
    setWheelBox({
      x: wheelBoxTemp.x + wheelBoxTemp.width / 2,
      y: wheelBoxTemp.y + wheelBoxTemp.height / 2,
      r: wheelBoxTemp.width / 2,
    })
    pointer.current.style.top = wheelBoxTemp.y + wheelBoxTemp.height / 2 - pointerBoxTemp.height / 2 + 'px'
    pointer.current.style.left = wheelBoxTemp.x + wheelBoxTemp.width / 2 - pointerBoxTemp.width / 2 + 'px'
    setPointerBox(pointerBoxTemp)
  }, [])

  const handlePointerClick = event => {
    if (
      Math.sqrt(
        Math.pow(event.clientX - wheelBox.x, 2) + Math.pow(event.clientY - wheelBox.y, 2)
      ) < wheelBox.r
    ) {
      pointer.current.style.top = event.clientY - pointerBox.height / 2 + 'px'
      pointer.current.style.left = event.clientX - pointerBox.width / 2 + 'px'
    }
    document.onmousemove = pointerDrag
  }

  const pointerDrag = event => {
    event.preventDefault()
    const pointerElmt = pointer.current.getBoundingClientRect()
    const pointerPosition = {
      x: pointerElmt.x + pointerElmt.width / 2,
      y: pointerElmt.y + pointerElmt.height / 2,
    }
    if (
      (Math.sqrt(Math.pow(event.clientX - wheelBox.x, 2) + Math.pow(event.clientY - wheelBox.y, 2)) + 10) <
      wheelBox.r
    ) {
      pointer.current.style.top = event.clientY - pointerBox.height / 2 + 'px'
      pointer.current.style.left = event.clientX - pointerBox.width / 2 + 'px'
    }
    let degs = Math.atan2(pointerPosition.y - wheelBox.y, pointerPosition.x - wheelBox.x) * (180 / Math.PI)
    if (degs < 0) {
      degs = degs + 360
    }
    let saturationTemp = Math.sqrt(
      Math.pow(pointerPosition.x - wheelBox.x, 2) + Math.pow(pointerPosition.y - wheelBox.y, 2)
    ) / wheelBox.r * 1.1
    if (saturationTemp > 1) {
      saturationTemp = 1
    }
    const hsvTemp = {
      h: degs / 360,
      s: saturationTemp,
      v: 1,
    }
    const pickedColor = rgbToHex(hsvToRgb(hsvTemp))
    pointer.current.style.backgroundColor = pickedColor
    setInput(pickedColor)
  }

  const handleColorInput = (event) => {
    setInput(event.target.value)
    const rgb = hexToRgb(event.target.value)
    if (rgb) {
      pointer.current.style.backgroundColor = event.target.value
      const hsv = (rgbToHsv(rgb))
      console.log(hsv);
      const coords = { ...hsv, h: hsv.h * 360, s: hsv.s * wheelBox.r }
      const theta = coords.h * Math.PI / 180
      pointer.current.style.left = coords.s * Math.cos(theta) + wheelBox.x - pointerBox.width + 'px'
      pointer.current.style.top = coords.s * Math.sin(theta) + wheelBox.y - pointerBox.height + 'px'
    }
  }

  const handleColorSubmit = event => {
    event.preventDefault()
    setColor(colorInput)
    navigate(`/palettes/`)
  }

  return (
    <>
      <div style={wheelStyles.wrapperStyle}>
        <div ref={wheel} style={wheelStyles.bottomWheelStyle}></div>
        <div style={wheelStyles.topWheelStyle}></div>
        <div
          ref={pointer}
          style={wheelStyles.pointerStyle}
          onMouseDown={event => handlePointerClick(event)}
          onMouseUp={() => document.onmousemove = null}
        ></div>
      </div>
      <form onSubmit={handleColorSubmit}>
        <input type='text' value={colorInput} onChange={handleColorInput} />
        <button type='submit'>Create palettes</button>
      </form>
    </>
  )
}

export default ColorWheel
