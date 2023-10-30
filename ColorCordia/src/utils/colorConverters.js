/* eslint-disable no-empty */
export const hsvToRgb = (hsv) => {
  if (hsv.h > 1) {
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

/*
MIT License

Copyright (c) 2014 Frederik Ring

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
export const ncsToRgb = (ncs) => {
  const ncsRe = /^S\s(\d{2})(\d{2})-(N|R|G|B|Y)(\d{2})?(R|G|B|Y)?$/
  ncs = ncs.trim().toUpperCase().match(ncsRe)

  if (ncs === null) {
    return null
  }

  const blackness = Number(ncs[1])
  const mainColor = ncs[3]
  const colorShift = Number(ncs[4]) || 0

  if (mainColor === 'N') {
    const v = Number((1 - blackness / 100) * 255)
    return {
      r: v,
      g: v,
      b: v
    }
  } else {
    const C = Number(ncs[2])
    let Ra,
      x1,
      Ba,
      x2,
      x3,
      x5,
      Ga,
      x6,
      x7,
      x8,
      Rc,
      Gc,
      Bc,
      top,
      ss

    // extract red
    if (mainColor === 'Y' && colorShift <= 60) {
      Ra = 1
    } else if ((mainColor === 'Y' && colorShift > 60) || (mainColor === 'R' && colorShift <= 80)) {
      if (mainColor === 'Y') {
        x1 = colorShift - 60
      } else {
        x1 = colorShift + 40
      }
      Ra = ((Math.sqrt(14884 - Math.pow(x1, 2))) - 22) / 100
    } else if ((mainColor === 'R' && colorShift > 80) || (mainColor === 'B')) {
      Ra = 0
    } else if (mainColor === 'G') {
      x1 = (colorShift - 170)
      Ra = ((Math.sqrt(33800 - Math.pow(x1, 2))) - 70) / 100
    }

    // extract blue
    if (mainColor === 'Y' && colorShift <= 80) {
      Ba = 0
    } else if ((mainColor === 'Y' && colorShift > 80) || (mainColor === 'R' && colorShift <= 60)) {
      if (mainColor === 'Y') {
        x2 = (colorShift - 80) + 20.5
      } else {
        x2 = (colorShift + 20) + 20.5
      }
      Ba = (104 - (Math.sqrt(11236 - Math.pow(x2, 2)))) / 100
    } else if ((mainColor === 'R' && colorShift > 60) || (mainColor === 'B' && colorShift <= 80)) {
      if (mainColor === 'R') {
        x3 = (colorShift - 60) - 60
      } else {
        x3 = (colorShift + 40) - 60
      }
      Ba = ((Math.sqrt(10000 - Math.pow(x3, 2))) - 10) / 100
    } else if ((mainColor === 'B' && colorShift > 80) || (mainColor === 'G' && colorShift <= 40)) {
      if (mainColor === 'B') {
        x5 = (colorShift - 80) - 131
      } else {
        x5 = (colorShift + 20) - 131
      }
      Ba = (122 - (Math.sqrt(19881 - Math.pow(x5, 2)))) / 100
    } else if (mainColor === 'G' && colorShift > 40) {
      Ba = 0
    }

    // exctract green
    if (mainColor === 'Y') {
      Ga = (85 - 17 / 20 * colorShift) / 100
    } else if (mainColor === 'R' && colorShift <= 60) {
      Ga = 0
    } else if (mainColor === 'R' && colorShift > 60) {
      x6 = (colorShift - 60) + 35
      Ga = (67.5 - (Math.sqrt(5776 - Math.pow(x6, 2)))) / 100
    } else if (mainColor === 'B' && colorShift <= 60) {
      x8 = (1 * colorShift - 68.5)
      Ga = (6.5 + (Math.sqrt(7044.5 - Math.pow(x8, 2)))) / 100
    } else if ((mainColor === 'B' && colorShift > 60) || (mainColor === 'G' && colorShift <= 60)) {
      Ga = 0.9
    } else if (mainColor === 'G' && colorShift > 60) {
      x7 = (colorShift - 60)
      Ga = (90 - (1 / 8 * x7)) / 100
    }

    // extract saturation
    x2 = (Ra + Ga + Ba) / 3
    Rc = ((x2 - Ra) * (100 - C) / 100) + Ra
    Gc = ((x2 - Ga) * (100 - C) / 100) + Ga
    Bc = ((x2 - Ba) * (100 - C) / 100) + Ba

    // extract blackness
    top = Math.max(Rc, Gc, Bc)

    ss = 1 / top
    const S = (1.05 * blackness - 5.25)
    return {
      r: parseInt((Rc * ss * (100 - S) / 100) * 255, 10),
      g: parseInt((Gc * ss * (100 - S) / 100) * 255, 10),
      b: parseInt((Bc * ss * (100 - S) / 100) * 255, 10)
    }
  }
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