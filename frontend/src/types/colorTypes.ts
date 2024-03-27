export interface ColorName {
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

export type HEX = string

