import axios from "axios"
const BASE_URL = 'http://localhost:3001/api/colors'

export const GetColorNames = async palette => {
  return (await axios.get(`${BASE_URL}/${palette}`)).data
}