export interface PaletteInterface {
  id?: string,
  palette: string,
  user: PaletteUser,
  likes: number
}

export interface UserInterface {
  id?: string,
  username: string,
  password: string,
  likedPosts: string[]
}

export interface PaletteUser {
  id: string,
  username: string
}