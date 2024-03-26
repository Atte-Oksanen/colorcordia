import axios from 'axios'
import fs from 'fs'
import { colorConverter } from './colorConverters'

const colors: { name: string, hex: string }[] = JSON.parse(fs.readFileSync('./colorNames.json').toString())


const sendColorsToDB = async () => {
  let progress = 0
  for (let index = 0; index < colors.length; index++) {
    const element = { ...colors[index], rgb: colorConverter.hexToRgb(colors[index].hex) };
    await axios.post("http://localhost:3001/api/colors", element)
    if (index % 30 === 0) {
      progress += 0.1
      console.log(progress)
    }
  }

}

sendColorsToDB()
