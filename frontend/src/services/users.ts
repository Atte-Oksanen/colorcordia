import axios from 'axios'
import { PasswordChangeObject, TokenResponse, User, UserCreds } from '../types/userManagementTypes'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api/users'
} else {
  BASE_URL = 'https://colorcordia-backend.onrender.com/api/users'
}

let token: string | null = null

export const setUserToken = (newToken: string) => {
  token = newToken
}

export const login = async (creds: UserCreds): Promise<TokenResponse> => {
  return (await axios.post(`${BASE_URL}/login`, creds)).data
}

export const signUp = async (user: UserCreds): Promise<User> => {
  return (await axios.post(`${BASE_URL}/signup`, user)).data
}

export const checkUsername = async (username: string): Promise<boolean> => {
  const response = (await axios.get(`${BASE_URL}/usernames/${username}`)).data
  if (response.uniqueName === true) {
    return true
  } else {
    return false
  }
}

export const getUser = async (userId: string): Promise<User> => {
  return (await axios.get(`${BASE_URL}/getuser/${userId}`, { headers: { authorization: token } })).data
}

export const changePassword = async (creds: PasswordChangeObject): Promise<User> => {
  return (await axios.post(`${BASE_URL}/password`, creds)).data
}

export const deleteUser = async (userId: string) => {
  return (await axios.delete(`${BASE_URL}/delete/${userId}`, { headers: { authorization: token } })).data
}
