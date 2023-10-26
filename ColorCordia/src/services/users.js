import axios from "axios"
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api/users'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/api/users'
}

let token = null

export const setUserToken = newToken => {
  token = newToken
}

export const login = async creds => {
  return (await axios.post(`${BASE_URL}/login`, creds)).data
}

export const signUp = async user => {
  return (await axios.post(`${BASE_URL}/signup`, user)).data
}

export const checkUsername = async username => {
  const response = (await axios.get(`${BASE_URL}/usernames/${username}`)).data
  if (response.uniqueName === true) {
    return true
  } else {
    return false
  }
}

export const getUser = async userId => {
  return (await axios.get(`${BASE_URL}/getuser/${userId}`, { headers: { authorization: token } })).data
}

