import axios from "axios"
const BASE_URL = 'https://colorcordia-backend.onrender.com/api/colors'

export const GetColorNames = async palette => {
  return (await axios.get(`${BASE_URL}/${palette}`)).data
}