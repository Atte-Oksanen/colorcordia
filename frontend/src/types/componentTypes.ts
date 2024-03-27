import { HEX } from "./colorTypes"

export interface Message {
  text: string,
  warning: boolean
}

export interface Palette {
  id?: string,
  palette: string,
  user: PaletteUser,
  likes: number
}

export interface PaletteUser {
  id: string,
  username: string
}

export interface PaletteWithColors {
  name: string,
  colors: HEX[],
  id: string
}