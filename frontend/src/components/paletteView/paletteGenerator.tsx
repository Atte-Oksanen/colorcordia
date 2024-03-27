import { useEffect, useState } from "react"
import {
  analogousHarmony, monoHarmony, triadHarmony,
  complementaryHarmony, splitComplementaryHarmony, doubleSplitComplementary,
  squareHarmony, compoundHarmony, shadeHarmony
} from "../../utils/colorHarmonies"
import ColorPalette from "./ColorPalette"
import { randomizeColor } from "../../utils/colorRandomizer"
import { HEX, Harmony } from "../../types/colorTypes"

interface props {
  color: HEX,
  setColor?: React.Dispatch<React.SetStateAction<string | null>>
}

const PaletteGenerator = ({ color, setColor }: props) => {
  const [colorHarmonies, setHarmonies] = useState<Harmony[]>([])

  useEffect(() => {
    if (!color && setColor) {
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
    <div className="h-fit md:ml-4">
      {colorHarmonies.map(harmony => <ColorPalette key={Math.random()} palette={harmony}></ColorPalette>)}
    </div>
  )
}

export default PaletteGenerator