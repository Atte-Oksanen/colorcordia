import axios from "axios"
const BASE_URL = 'http://localhost:3001/api/colors'

export const GetColorName = async hex => {
  return (await axios.get(`${BASE_URL}/${hex}`)).data
}