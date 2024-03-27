import axios from 'axios'
import { ColorName } from '../types/colorTypes'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api/colors'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/api/colors'
}


export const GetColorNames = async (palette: string): Promise<ColorName[]> => {
  return (await axios.get(`${BASE_URL}/${palette}`)).data
}