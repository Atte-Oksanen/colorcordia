const ncsConvertRouter = require('express').Router()
const fs = require('fs')
const { hexToRgb } = require('../utils/colorConverters')
const ncsColors = []

const tempColors = JSON.parse(fs.readFileSync('./data/ncs_values.json'))
tempColors.forEach(element => {
  ncsColors.push({ ...element, rgb: hexToRgb(element.HEX), NCS: `S ${element.NCS}` })
});
console.info(`${ncsColors.length} ncs colors loaded`)

ncsConvertRouter.get('/:id', (req, res) => {
  const searchedRgb = hexToRgb(req.params.id)
  let closestColor = ncsColors[0]
  let distanceToColor = Math.pow(searchedRgb.r - ncsColors[0].rgb.r, 2) + Math.pow(searchedRgb.g - ncsColors[0].rgb.g, 2) + Math.pow(searchedRgb.b - ncsColors[0].rgb.b, 2)
  for (let index = 1; index < ncsColors.length; index++) {
    const ncsRgb = ncsColors[index].rgb
    const newDistance = Math.pow(searchedRgb.r - ncsRgb.r, 2) + Math.pow(searchedRgb.g - ncsRgb.g, 2) + Math.pow(searchedRgb.b - ncsRgb.b, 2)
    if (newDistance < distanceToColor) {
      distanceToColor = newDistance
      closestColor = ncsColors[index]
    }
  }
  return res.json(closestColor)
})


module.exports = ncsConvertRouter