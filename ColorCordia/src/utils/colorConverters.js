/* eslint-disable no-empty */
export const hsvToRgb = (hsv) => {
  if (hsv.h > 1 || hsv.s > 1) {
    return null
  }
  if (hsv.v > 1) {
    hsv.v = 1
  }
  let r, g, b

  let i = Math.floor(hsv.h * 6)
  let f = hsv.h * 6 - i
  let p = hsv.v * (1 - hsv.s)
  let q = hsv.v * (1 - f * hsv.s)
  let t = hsv.v * (1 - (1 - f) * hsv.s)

  switch (i % 6) {
    case 0:
      (r = hsv.v), (g = t), (b = p)
      break
    case 1:
      (r = q), (g = hsv.v), (b = p)
      break
    case 2:
      (r = p), (g = hsv.v), (b = t)
      break
    case 3:
      (r = p), (g = q), (b = hsv.v)
      break
    case 4:
      (r = t), (g = p), (b = hsv.v)
      break
    case 5:
      (r = hsv.v), (g = p), (b = q)
      break
  }
  return { r: r * 255, g: g * 255, b: b * 255 }
}

export const rgbToHsv = (rgb) => {
  let r = rgb.r, g = rgb.g, b = rgb.b
  r = r / 255, g = g / 255, b = b / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;

  const d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h, s: s, v: v };
}

export const rgbToHex = (rgb) => {
  const valueToHex = (v) => {
    const hex = v.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  try {
    if (rgb.r < 256 && rgb.g < 256 && rgb.b < 256) {
      return `#${valueToHex(Math.round(rgb.r))}${valueToHex(Math.round(rgb.g))}${valueToHex(Math.round(rgb.b))}`
    }
  } catch (error) { }
  return null
}

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const hsvToHsl = hsv => {
  const lightness = hsv.v - hsv.v * hsv.s / 2
  const min = Math.min(lightness, 1 - lightness)
  return { h: hsv.h, s: min ? (hsv.v - 1) / min : 0, l: lightness }
}

export const getTextColor = (bgColor) => {
  const bgHsl = hsvToHsl(rgbToHsv(hexToRgb(bgColor)))
  if (bgHsl.l < 0.4) {
    return '#ffffff'
  } else {
    return '#000000'
  }

}