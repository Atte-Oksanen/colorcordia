const ncsConvertRouter = require('express').Router()
const fs = require('fs')
const { hexToRgb } = require('../utils/colorConverters')
const ncsColors = JSON.parse(fs.readFileSync('./data/ncs_values.json'))

console.info(`${ncsColors.length} ncs colors loaded`)

ncsConvertRouter.get('/hex/:id', (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ message: "invalid hex notation" })
  }
})

ncsConvertRouter.get('/ncs/:id', (req, res) => {
  try {
    const searchedColor = ncsColors.find(element => element.ncs === req.params.id)
    if (!searchedColor) {
      return res.status(400).json({ message: "invalid ncs notation" })
    }
    return res.json(searchedColor.hex)
  } catch (error) {
    return res.status(400).json({ message: "invalid ncs notation" })
  }
})


module.exports = ncsConvertRouter