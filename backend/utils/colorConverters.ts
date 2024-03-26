import { HEX, RGB } from "../types/colorTypes"

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


export const colorConverter = {
  rgbToHex,
  hexToRgb
}