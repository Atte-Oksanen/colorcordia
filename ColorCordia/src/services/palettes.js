import axios from "axios"

const baseUrl = 'http://localhost:3001/api/palettes'

export const getPalettes = async () => {
  return (await axios.get(baseUrl)).data
}

export const getPaletteById = async id => {
  return (await axios.get(`${baseUrl}/${id}`)).data
}

export const likePalette = async palette => {
  return (await axios.put(`${baseUrl}/${palette.id}`, palette))
}

export const createPalette = async paletteString => {
  const newPalette = {
    palette: paletteString,
    user: "template",
    name: "template",
    likes: 0
  }
  return (await axios.post(baseUrl, newPalette))
}