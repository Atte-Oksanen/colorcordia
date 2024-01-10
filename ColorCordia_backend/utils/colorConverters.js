const rgbToHex = (rgb) => {
  const valueToHex = (v) => {
    const hex = v.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${valueToHex(Math.round(rgb.r))}${valueToHex(Math.round(rgb.g))}${valueToHex(
    Math.round(rgb.b)
  )}`
}

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

module.exports = { hexToRgb, rgbToHex }