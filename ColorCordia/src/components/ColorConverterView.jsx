/* eslint-disable react/prop-types */
import { useState } from "react"
import { hexToRgb, hsvToRgb, ncsToRgb, rgbToHex, rgbToHsv } from "../utils/colorConverters"
import { hexToNcs } from "../services/ncsConvert"

const ColorConverterView = ({ setMessage }) => {
  const [startUnit, setStartUnit] = useState('Hex')
  const [startValue, setStartValue] = useState('')
  const [endUnit, setEndUnit] = useState('HSV')
  const [endValue, setEndValue] = useState('')
  const [showComparison, setShowComparison] = useState(false)
  const [comparableColors, setComparable] = useState([])

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

  const handleColorConversion = async () => {
    setShowComparison(false)
    switch (startUnit) {
      case 'Hex':
        if (!hexToRgb(startValue)) {
          setMessage("Invalid color input")
          break
        }
        switch (endUnit) {
          case 'Hex':
            setEndValue(startValue)
            setComparable([{ color: startValue, name: startValue }])
            return
          case 'RGB': {
            const rgb = hexToRgb(startValue)
            console.log(rgb)
            setEndValue(`${rgb.r}, ${rgb.g}, ${rgb.b}`)
            setComparable([{ color: startValue, name: `${rgb.r}, ${rgb.g}, ${rgb.b}` }])
            return
          }
          case 'HSV': {
            const hsv = rgbToHsv(hexToRgb(startValue))
            const hsvString = `${Math.round(hsv.h * 360)}, ${Math.round(hsv.s * 100)}, ${Math.round(hsv.v * 100)}`
            setEndValue(hsvString)
            setComparable([{ color: startValue, name: hsvString }])
            return
          }
          case 'NCS': {
            const ncs = await hexToNcs(startValue.substring(1))
            setEndValue(ncs.ncs)
            setComparable([{ color: startValue, name: startValue }, ncs])
            setShowComparison(true)
            return
          }
          default:
            return 'Color Code'
        }
      case 'RGB': {
        const rgbArray = startValue.split(',')
        if (rgbArray.length !== 3) {
          setMessage("Invalid color input")
          break
        }
        const rgbObj = {
          r: Number(rgbArray[0]),
          g: Number(rgbArray[1]),
          b: Number(rgbArray[2]),
        }
        const hex = rgbToHex(rgbObj)
        if (!hex) {
          setMessage("Invalid color input")
          break
        }
        switch (endUnit) {
          case 'Hex': {
            setEndValue(hex)
            setComparable([{ color: hex, name: hex }])
            return
          }
          case 'RGB': {
            setEndValue(startValue)
            setComparable([{ color: hex, name: startValue }])
            return
          }
          case 'HSV': {
            const hsv = rgbToHsv(rgbObj)
            const hsvString = `${Math.round(hsv.h * 360)}, ${Math.round(hsv.s * 100)}, ${Math.round(hsv.v * 100)}`
            setEndValue(hsvString)
            setComparable([{ color: hex, name: hsvString }])
            return
          }
          case 'NCS': {
            const ncs = await hexToNcs(hex.substring(1))
            setEndValue(ncs.ncs)
            setComparable([{ color: startValue, name: startValue }, ncs])
            setShowComparison(true)
            return
          }
          default:
            return 'Color Code'
        }
      }
      case 'HSV': {
        const hsvArray = startValue.split(',')
        if (hsvArray.length !== 3) {
          setMessage("Invalid color input")
          break
        }
        const hsvObj = {
          h: Number(hsvArray[0] / 360),
          s: Number(hsvArray[1] / 100),
          v: Number(hsvArray[2] / 100),
        }
        const hex = rgbToHex(hsvToRgb(hsvObj))
        if (!hex) {
          setMessage("Invalid color input")
          break
        }
        switch (endUnit) {
          case 'Hex': {
            setEndValue(hex)
            setComparable([{ color: hex, name: hex }])
            return
          }
          case 'RGB': {
            const rgb = hexToRgb(hex)
            setEndValue(`${rgb.r}, ${rgb.g}, ${rgb.b}`)
            setComparable([{ color: hex, name: `${rgb.r}, ${rgb.g}, ${rgb.b}` }])
            return
          }
          case 'HSV': {
            setEndValue(startValue)
            setComparable([{ color: hex, name: startValue }])
            return
          }
          case 'NCS': {
            const ncs = await hexToNcs(hex.substring(1))
            setEndValue(ncs.ncs)
            setComparable([{ color: startValue, name: startValue }, ncs])
            setShowComparison(true)
            return
          }
          default:
            return 'Color Code'
        }
      }

      case 'NCS': {
        const hex = rgbToHex(ncsToRgb(startValue))
        if (!hex) {
          setMessage("Invalid color input")
          break
        }
        switch (endUnit) {
          case 'Hex': {
            setEndValue(hex)
            setComparable([{ color: hex, name: hex }])
            return
          }
          case 'RGB': {
            const rgb = hexToRgb(hex)
            setEndValue(`${rgb.r}, ${rgb.g}, ${rgb.b}`)
            setComparable([{ color: hex, name: `${rgb.r}, ${rgb.g}, ${rgb.b}` }])
            return
          }
          case 'HSV': {
            const hsv = rgbToHsv(hexToRgb(hex))
            const hsvString = `${Math.round(hsv.h * 360)}, ${Math.round(hsv.s * 100)}, ${Math.round(hsv.v * 100)}`
            setEndValue(hsvString)
            setComparable([{ color: hex, name: hsvString }])
            return
          }
          case 'NCS': {
            setEndValue(startValue)
            setComparable([{ color: hex, name: startValue }])
            return
          }
          default:
            break;
        }
      }
    }
  }

  const renderComparison = () => {
    if (comparableColors.length < 1) {
      return null
    }
    if (showComparison) {
      return (
        <div>
          <div style={{ background: `${comparableColors[0]}.color` }}>{comparableColors[0].name}</div>
          <div style={{ background: `${comparableColors[1].hex}` }} >{comparableColors[1].ncs}</div>
          <div>
            Note: NCS color representations shown here are merely an approximation of the nearest NCS standard color.
            <br />
            For accurate color representations visit your local paint shop or <a href="https://ncscolour.com/" target="_blank" rel="noreferrer">ncscolour.com</a>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div style={{ background: `${comparableColors[0].color}` }}>{comparableColors[0].name}</div>
      </div>
    )
  }
  return (
    <div>
      Color system
      <select onChange={event => setStartUnit(event.target.value)} value={startUnit}>
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
      <select onChange={event => setEndUnit(event.target.value)} value={endUnit}>
        <option>Hex</option>
        <option>RGB</option>
        <option>HSV</option>
        <option>NCS</option>
      </select>
      <input type="text" placeholder="Color code" readOnly value={endValue}></input>
      {renderComparison()}
    </div>
  )
}

export default ColorConverterView