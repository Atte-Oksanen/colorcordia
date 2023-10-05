import { useEffect, useRef, useState } from 'react'
import wheelStyles from './colorWheelStyling'

const ColorWheel = () => {
  const pointer = useRef()
  const wheel = useRef()
  const [pointerBox, setPointerBox] = useState('')
  const [wheelBox, setWheelBox] = useState({})

  useEffect(() => {
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
    if (
      (Math.sqrt(Math.pow(event.clientX - wheelBox.x, 2) + Math.pow(event.clientY - wheelBox.y, 2)) + 10) <
      wheelBox.r
    ) {
      pointer.current.style.top = event.clientY - pointerBox.height / 2 + 'px'
      pointer.current.style.left = event.clientX - pointerBox.width / 2 + 'px'
    }

  }
  return (
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

  )
}

export default ColorWheel
