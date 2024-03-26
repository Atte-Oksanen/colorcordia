export interface PaletteInterface {
  palette: string,
  user: PaletteUser,
  name: string,
  likes: number
}

export interface UserInterface {
  username: string,
  password: string,
  likedPosts: string[]
}

export interface PaletteUser {
  id: string,
  username: string
}