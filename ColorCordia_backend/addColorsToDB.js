const axios = require('axios')
const fs = require('fs');
const { hexToRgb } = require('./utils/colorConverters');

const colors = JSON.parse(fs.readFileSync('./colorNames.json'))


const sendColorsToDB = async () => {
  let progress = 0
  for (let index = 0; index < colors.colors.length; index++) {
    const element = { ...colors.colors[index], rgb: hexToRgb(colors.colors[index].hex) };
    await axios.post("http://localhost:3001/api/colors", element)
    if (index % 30 === 0) {
      progress += 0.1
      console.log(progress)
    }
  }

}

sendColorsToDB()
