import axios from 'axios'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api/md'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/api/md'
}

export const getAboutText = async () => {
  return (await axios.get(`${BASE_URL}/about`)).data.text
}