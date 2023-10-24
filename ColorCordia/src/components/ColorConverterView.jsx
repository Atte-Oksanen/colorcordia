import { useState } from "react"
import { hexToRgb, hsvToNcs, ncsToRgb, rgbToHex, rgbToHsv } from "../utils/colorConverters"

const ColorConverterView = () => {
  const [startUnit, setStartUnit] = useState('Hex')
  const [startValue, setStartValue] = useState('')
  const [endUnit, setEndUnit] = useState('HSV')
  const [endValue, setEndValue] = useState('')

  const getPlaceHolderFormat = () => {
    switch (startUnit) {
      case 'Hex':
        return 'e.g. #85d2d6'
      case 'RGB':
        return 'e.g. 133, 210, 214'
      case 'HSV':
        return 'e.g. 183, 38, 84'
      case 'NCS':
        return 'e.g. S 0502-B50G'
      default:
        return 'Color Code'
    }
  }

  const handleColorConversion = () => {
    switch (startUnit) {
      case 'Hex':
        switch (endUnit) {
          case 'Hex':
            setEndValue(startValue)
            return
          case 'RGB': {
            const rgb = hexToRgb(startValue)
            setEndValue(`${rgb.r}, ${rgb.g}, ${rgb.b}`)
            return
          }
          case 'HSV': {
            const hsv = rgbToHsv(hexToRgb(startValue))
            setEndValue(`${Math.round(hsv.h * 360)}, ${Math.round(hsv.s * 100)}, ${Math.round(hsv.v * 100)}`)
            return
          }
          case 'NCS':
            hsvToNcs(rgbToHsv(hexToRgb(startValue)))
            return 'e.g. S 0502-B50G'
          default:
            return 'Color Code'
        }
      case 'RGB':
        return 'e.g. 133, 210, 214'
      case 'HSV':
        return 'e.g. 183, 38, 84'
      case 'NCS':
        switch (endUnit) {
          case 'Hex':
            setEndValue(rgbToHex(ncsToRgb(startValue)))
            break;

          default:
            break;
        }
        break
      default:
        return 'Color Code'
    }
  }
  return (
    <div>
      Color system
      <select onChange={event => setStartUnit(event.target.value)}>
        <option>Hex</option>
        <option>RGB</option>
        <option>HSV</option>
        <option>NCS</option>
      </select>
      <input type="text" placeholder={getPlaceHolderFormat()} value={startValue} onChange={event => setStartValue(event.target.value)}></input>
      <br />
      <button onClick={handleColorConversion}>Convert to</button>
      <br />
      Color system
      <select onChange={event => setEndUnit(event.target.value)}>
        <option>Hex</option>
        <option>RGB</option>
        <option selected>HSV</option>
        <option>NCS</option>
      </select>
      <input type="text" placeholder="Color code" readOnly value={endValue}></input>
    </div>
  )
}

export default ColorConverterView