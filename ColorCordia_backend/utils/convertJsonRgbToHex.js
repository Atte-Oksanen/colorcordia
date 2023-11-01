const fs = require('fs')
const { rgbToHex } = require('./colorConverters')

const inputColors = JSON.parse(fs.readFileSync('../data/ncs_values_new.json'))

const outputColors = inputColors.map(element => {
  return {
    ncs: element.NCS,
    hex: rgbToHex({ r: element.R, g: element.G, b: element.B }),
    rgb: { r: element.R, g: element.G, b: element.B }
  }
})

fs.writeFileSync('../data/ncs_values_with_hex.json', JSON.stringify(outputColors))