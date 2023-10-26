import axios from 'axios'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api/convertncs'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/api/convertncs'
}

export const hexToNcs = async hex => {
  return (await axios.get(`${BASE_URL}/${hex}`)).data
}