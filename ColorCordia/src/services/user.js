import axios from "axios"
const BASE_URL = 'http://localhost:3001/api/users'

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

