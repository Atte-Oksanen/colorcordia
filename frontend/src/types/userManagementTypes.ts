import { Palette } from "./componentTypes"

export interface UserCreds {
  username: string,
  password: string
}

export interface User {
  id?: string,
  username: string,
  password?: string,
  likedPosts?: string[],
  palettes?: Palette[]
}

export interface TokenResponse {
  token: string,
  username: string,
  id: string
}

export interface PasswordChangeObject {
  username: string,
  currentPassword: string,
  newPassword: string
}