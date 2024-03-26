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

export type HEX = string

