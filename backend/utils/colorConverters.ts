import { HEX, HSV, RGB } from "../types/colorTypes"

/**
 * RGB to Hex transformation function
 * @param rgb 
 * @returns {HEX} a hex string
 * @throws {Error} throws exception if input is invalid RGB
 */
const rgbToHex = (rgb: RGB): HEX => {
  if (rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 0) {
    throw new Error('Provided value is invalid RGB')
  }
  const valueToHex = (v: number) => {
    const hex = v.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${valueToHex(Math.round(rgb.r))}${valueToHex(Math.round(rgb.g))}${valueToHex(
    Math.round(rgb.b)
  )}`
}

/**
 * Hex to RGB transformation function
 * @param {HEX} hex 
 * @returns {RGB} RGB object
 * @throws {Error} throws exception if the input hex is invalid
 */
const hexToRgb = (hex: HEX): RGB => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Invalid hex string provided')
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  }
}

/**
 * RGB to HSV transformation function
 * @param {RGB} rgb 
 * @returns {HSV}
 */
const rgbToHsv = (rgb: RGB): HSV => {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0

  const d = max - min
  s = max == 0 ? 0 : d / max

  if (max == min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return { h: h, s: s, v: max }
}

const hexToHsv = (hex: HEX): HSV => {
  const hsv = rgbToHsv(hexToRgb(hex))
  return hsv
}


export const colorConverter = {
  rgbToHex,
  hexToRgb,
  hexToHsv,
  rgbToHsv
}