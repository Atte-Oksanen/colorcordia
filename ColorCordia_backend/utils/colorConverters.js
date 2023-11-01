const hsvToRgb = (hsv) => {
  let h = hsv.h, s = hsv.s, v = hsv.v
  let r, g, b

  let i = Math.floor(h * 6)
  let f = h * 6 - i
  let p = v * (1 - s)
  let q = v * (1 - f * s)
  let t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p)
      break
    case 1:
      (r = q), (g = v), (b = p)
      break
    case 2:
      (r = p), (g = v), (b = t)
      break
    case 3:
      (r = p), (g = q), (b = v)
      break
    case 4:
      (r = t), (g = p), (b = v)
      break
    case 5:
      (r = v), (g = p), (b = q)
      break
  }
  return { r: r * 255, g: g * 255, b: b * 255 }
}

const rgbToHsv = (rgb) => {
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
  } : null;
}

module.exports = { hexToRgb, rgbToHex }