import { useEffect, useState } from "react"
import { hexToRgb, rgbToHex } from "../../utils/colorConverters"

const ColorRange = ({ setColor, color }) => {
  const [sliderRgb, setRgb] = useState({ r: '', g: '', b: '' })

  useEffect(() => {
    const rgb = hexToRgb(color)
    setRgb(rgb)
  }, [color])

  if (!color) {
    return null
  }

  const handleSlider = newRgb => {
    setRgb(newRgb)
    setColor(rgbToHex(newRgb))
  }

  return (
    <div className="w-full text-sm">
      <div className="flex justify-between">
        <span className="inline-block">Red</span>
        <div className="inline-block">{sliderRgb.r}</div>
      </div>
      <input className="rounded-full w-full"
        style={{ WebkitAppearance: 'none', appearance: 'none', outline: 'none', background: `linear-gradient(90deg, rgba(0,${sliderRgb.g},${sliderRgb.b},1) 0%, rgba(255,${sliderRgb.g},${sliderRgb.b},1) 100%)`, height: '0.5rem', accentColor: rgbToHex({ r: sliderRgb.r, g: sliderRgb.g, b: sliderRgb.b }) }}
        type="range" max={255} value={sliderRgb.r} onChange={event => handleSlider({ ...sliderRgb, r: event.target.value })} />
      <div className="flex justify-between">
        <span className="inline-block">Green</span>
        <div className="inline-block">{sliderRgb.g}</div>
      </div>
      <input className="rounded-full w-full"
        style={{ WebkitAppearance: 'none', appearance: 'none', outline: 'none', background: `linear-gradient(90deg, rgba(${sliderRgb.r},0,${sliderRgb.b},1) 0%, rgba(${sliderRgb.r},255,${sliderRgb.b},1) 100%)`, height: '0.5rem', accentColor: rgbToHex({ r: sliderRgb.r, g: sliderRgb.g, b: sliderRgb.b }) }}
        type="range" max={255} value={sliderRgb.g} onChange={event => handleSlider({ ...sliderRgb, g: event.target.value })} />
      <br />
      <div className="flex justify-between">
        <span className="inline-block">Blue</span>
        <div className="inline-block">{sliderRgb.b}</div>
      </div>
      <input className="rounded-full w-full"
        style={{ WebkitAppearance: 'none', appearance: 'none', outline: 'none', background: `linear-gradient(90deg, rgba(${sliderRgb.r},${sliderRgb.g},0,1) 0%, rgba(${sliderRgb.r},${sliderRgb.g},255,1) 100%)`, height: '0.5rem', accentColor: rgbToHex({ r: sliderRgb.r, g: sliderRgb.g, b: sliderRgb.b }) }}
        type="range" max={255} value={sliderRgb.b} onChange={event => handleSlider({ ...sliderRgb, b: event.target.value })} />
    </div>
  )
}

export default ColorRange