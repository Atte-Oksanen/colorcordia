/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import {
  analogousHarmony, monoHarmony, triadHarmony,
  complementaryHarmony, splitComplementaryHarmony, doubleSplitComplementary,
  squareHarmony, compoundHarmony, shadeHarmony
} from "../../utils/colorHarmonies"
import ColorPalette from "./ColorPalette"
import { randomizeColor } from "../../utils/colorRandomizer"
const PaletteGenerator = ({ color, setColor }) => {
  const [colorHarmonies, setHarmonies] = useState([])

  useEffect(() => {
    if (!color) {
      setColor(randomizeColor())
    } else {
      setHarmonies([
        {
          harmony: analogousHarmony(color),
          type: "Analogous"
        },
        {
          harmony: monoHarmony(color),
          type: "Monochromatic"
        },
        {
          harmony: triadHarmony(color),
          type: "Triad"
        },
        {
          harmony: complementaryHarmony(color),
          type: "Complementary"
        },
        {
          harmony: splitComplementaryHarmony(color),
          type: "Split complementary"
        },
        {
          harmony: doubleSplitComplementary(color),
          type: "Double Split Complementary"
        },
        {
          harmony: squareHarmony(color),
          type: "Square"
        },
        {
          harmony: compoundHarmony(color),
          type: "Compound"
        },
        {
          harmony: shadeHarmony(color),
          type: "Shade"
        }
      ])
    }
  }, [color, setColor])

  return (
    <>
      {colorHarmonies.map(harmony => <ColorPalette key={Math.random()} palette={harmony}></ColorPalette>)}
    </>
  )
}

export default PaletteGenerator