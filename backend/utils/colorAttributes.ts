import { AttributeSkeleton, BrightnessAttributes, HSV, SaturationAttributes } from "../types/colorTypes"

const colorSegments = [
  { value: 20, name: 'red' },
  { value: 40, name: 'orange' },
  { value: 60, name: 'yellow' },
  { value: 80, name: 'lime' },
  { value: 140, name: 'green' },
  { value: 180, name: 'turqoise' },
  { value: 240, name: 'blue' },
  { value: 280, name: 'violet' },
  { value: 320, name: 'magenta' },
  { value: 340, name: 'rose' }
]

const saturationSegments = [
  { value: 100, name: 'vivid' },
  { value: 50, name: 'pastel' },
  { value: 0, name: 'muted' }
]

const brightnessSegments = [
  { value: 100, name: 'light' },
  { value: 50, name: 'neutral' },
  { value: 0, name: 'dark' }
]


const getColorClasses = (hsv: HSV): [keyof AttributeSkeleton, keyof SaturationAttributes, keyof BrightnessAttributes] => {
  const h = hsv.h * 360
  const s = hsv.s * 100
  const v = hsv.v * 100
  const attributes: string[] = []
  for (const colorSegment of colorSegments) {
    if (h < colorSegment.value) {
      attributes.push(colorSegment.name)
      break
    }
  }
  if (attributes.length === 0) {
    attributes.push(colorSegments[0].name)
  }
  attributes.push(saturationSegments.reduce((prev, curr) => (Math.abs(curr.value - s) < Math.abs(prev.value - s) ? curr : prev)).name)
  attributes.push(brightnessSegments.reduce((prev, curr) => (Math.abs(curr.value - v) < Math.abs(prev.value - v) ? curr : prev)).name)

  return attributes as [keyof AttributeSkeleton, keyof SaturationAttributes, keyof BrightnessAttributes]
}

const createSkeleton = (): AttributeSkeleton => {
  const skeleton = colorSegments.reduce((prevColorElement, currentColor) => {
    return {
      ...prevColorElement,
      [currentColor.name]: saturationSegments.reduce((prevSatElement, currentSaturation) => {
        return {
          ...prevSatElement,
          [currentSaturation.name]: brightnessSegments.reduce((prevBriElement, currentBrightness) => {
            return {
              ...prevBriElement,
              [currentBrightness.name]: []
            }
          }, {})
        }
      }, {})
    }
  }, {}) as AttributeSkeleton
  return skeleton
}

export const colorAttributor = {
  createSkeleton,
  getColorClasses
}
