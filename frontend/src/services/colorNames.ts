import axios from 'axios'
import { ColorAttribute, ColorName, HEX } from '../types/colorTypes'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api/colors'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/api/colors'
}


export const GetColorNames = async (palette: string): Promise<ColorName[]> => {
  return (await axios.get(`${BASE_URL}/colorname/${palette}`)).data
}

export const sendColorAttributes = async (attributes: ColorAttribute) => {
  await axios.post(`${BASE_URL}/attribute`, attributes)
}

export const getColorAttributeCount = async (): Promise<number> => {
  return (await axios.get(`${BASE_URL}/attribute/count`)).data.count
}

export const getColorAttributeList = async (): Promise<{ attributes: string[] }> => {
  return (await axios.get(`${BASE_URL}/attribute`)).data
}

export const getColorAttributes = async (colors: HEX[]): Promise<string[]> => {
  return (await axios.post(`${BASE_URL}/attribute/getattributes`, colors)).data
}