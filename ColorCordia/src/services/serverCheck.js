import axios from 'axios'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/'
}

export const checkServer = async () => {
  return (await axios.get(BASE_URL)).data
}