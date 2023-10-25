import axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/convertncs'

export const hexToNcs = async hex => {
  return (await axios.get(`${BASE_URL}/${hex}`)).data
}