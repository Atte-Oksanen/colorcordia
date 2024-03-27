import axios from 'axios'
import { HEX, NCS } from '../types/colorTypes'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api/convertncs'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/api/convertncs'
}

export const hexToNcs = async (hex: HEX): Promise<NCS> => {
  return (await axios.get(`${BASE_URL}/hex/${hex}`)).data
}

export const ncsToHex = async (ncs: string): Promise<HEX> => {
  return (await axios.get(`${BASE_URL}/ncs/${ncs}`)).data
}