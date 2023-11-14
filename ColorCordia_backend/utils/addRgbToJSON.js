const fs = require('fs')
const { rgbToHex, hexToRgb } = require('./colorConverters')

const inputColors = JSON.parse(fs.readFileSync('../data/ncs_values_new.json'))

const outputColors = inputColors.map(element => {
  return {
    ncs: element.ncs,
    hex: element.hex,
    rgb: hexToRgb(element.hex)
  }
})

fs.writeFileSync('../data/ncs_values_with_hex.json', JSON.stringify(outputColors))