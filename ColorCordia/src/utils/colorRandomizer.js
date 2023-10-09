import { hsvToRgb, rgbToHex } from "./colorConverters"

export const randomizeColor = () => {
  return rgbToHex({
    r: Math.random() * 245 + 10,
    g: Math.random() * 245 + 10,
    b: Math.random() * 245 + 10
  })
}

export const randomizeColorWheelPos = () => {
  return rgbToHex(hsvToRgb({
    h: Math.random(),
    s: (Math.random() + 0.1) % 0.98,
    v: 1
  }))
}