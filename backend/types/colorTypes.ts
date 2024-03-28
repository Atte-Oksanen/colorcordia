export interface ColorNameInterface {
  name: string,
  hex: HEX,
  rgb: RGB
}

export interface RGB {
  r: number,
  g: number,
  b: number,
}

export interface NCS {
  ncs: string,
  hex: HEX,
  rgb: RGB
}

export interface ColorName {
  name: string,
  hex: HEX,
  rgb: RGB
}


export interface HSV {
  h: number,
  s: number,
  v: number
}

export interface HSL {
  h: number,
  s: number,
  L: number
}

export interface Harmony {
  harmony: string[],
  type: string
}

export interface AttributeSkeleton {
  red: SaturationAttributes,
  orange: SaturationAttributes,
  yellow: SaturationAttributes,
  lime: SaturationAttributes,
  green: SaturationAttributes,
  turqoise: SaturationAttributes,
  blue: SaturationAttributes,
  violet: SaturationAttributes,
  magenta: SaturationAttributes,
  rose: SaturationAttributes
}

export interface SaturationAttributes {
  vivid: BrightnessAttributes,
  pastel: BrightnessAttributes,
  muted: BrightnessAttributes
}

export interface BrightnessAttributes {
  light: string[],
  neutral: string[],
  dark: string[]
}

export interface ColorAttribute {
  hex: HEX,
  attributes: string[]
}

export type HEX = string

