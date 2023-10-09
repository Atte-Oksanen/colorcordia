import axios from "axios"

const baseUrl = 'http://localhost:3000/palettes'

export const getPalettes = async () => {
    return (await axios.get(baseUrl)).data
}