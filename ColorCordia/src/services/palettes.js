import axios from "axios"
const BASE_URL = 'http://localhost:3001/api/palettes'
let token = null


export const setPaletteToken = newToken => {
  token = newToken
}

export const getPalettes = async () => {
  return (await axios.get(BASE_URL)).data
}

export const getPaletteById = async id => {
  return (await axios.get(`${BASE_URL}/${id}`)).data
}

export const likePalette = async palette => {
  return (await axios.put(`${BASE_URL}/${palette.id}`, palette, { headers: { authorization: token } }))
}

export const createPalette = async paletteString => {
  const newPalette = {
    palette: paletteString,
    user: "template",
    name: "template",
    likes: 0
  }
  return (await axios.post(BASE_URL, newPalette))
}