import axios from 'axios'
import { Palette } from '../types/componentTypes'
import { User } from '../types/userManagementTypes'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api/palettes'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/api/palettes'
}
let token = ''


export const setPaletteToken = (newToken: string) => {
  token = newToken
}

export const getPalettes = async (): Promise<Palette[]> => {
  return (await axios.get(BASE_URL)).data
}

export const getPaletteById = async (id: string): Promise<Palette> => {
  return (await axios.get(`${BASE_URL}/${id}`)).data
}

export const likePalette = async (palette: Palette): Promise<Palette> => {
  return (await axios.put(`${BASE_URL}/${palette.id}`, palette, { headers: { authorization: token } }))
}

export const createPalette = async (paletteString: string, user: User): Promise<Palette> => {
  const newPalette = {
    palette: paletteString,
    likes: 0,
    user: {
      username: user.username,
      id: user.id
    }
  }
  return ((await axios.post(BASE_URL, newPalette, { headers: { authorization: token } })).data)
}

export const getPalettesByCreator = async (creatorId: string): Promise<Palette[]> => {
  return (await axios.get(`${BASE_URL}/getpalettesbycreator/${creatorId}`)).data
}

export const deletePalette = async (paletteId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${paletteId}`, { headers: { authorization: token } })
}