import axios from 'axios'
const BASE_URL = 'https://colorcordia-backend.onrender.com/api/convertncs'

export const hexToNcs = async hex => {
  return (await axios.get(`${BASE_URL}/${hex}`)).data
}