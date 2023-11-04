const colorNameRouter = require('express').Router()
const ColorName = require('../models/colorName')
const { hexToRgb } = require('../utils/colorConverters')
const fs = require('fs')
const colors = [];

const tempColors = JSON.parse(fs.readFileSync('./data/color_names.json'))
tempColors.forEach(element => {
  colors.push({ ...element, rgb: hexToRgb(element.hex) })
})
console.info(`${colors.length} color names loaded`)

colorNameRouter.get('/', async (req, res) => {
  res.json(colors)
})

colorNameRouter.get('/:id', async (req, res) => {
  const hexArray = req.params.id.split('-')
  console.log(hexArray)
  const returnArray = []
  hexArray.forEach(element => {
    const elementRgb = hexToRgb(element)
    let closestName = colors[0]
    let distanceToName = Math.pow(elementRgb.r - colors[0].rgb.r, 2) + Math.pow(elementRgb.g - colors[0].rgb.g, 2) + Math.pow(elementRgb.b - colors[0].rgb.b, 2)
    for (let index = 1; index < colors.length; index++) {
      const colorsRgb = colors[index].rgb
      const newDistance = Math.pow(elementRgb.r - colorsRgb.r, 2) + Math.pow(elementRgb.g - colorsRgb.g, 2) + Math.pow(elementRgb.b - colorsRgb.b, 2)
      if (newDistance < distanceToName) {
        distanceToName = newDistance
        closestName = colors[index]
      }
    }
    returnArray.push({ ...closestName, hex: `#${element}` })
  })
  res.json(returnArray)
})

colorNameRouter.post('/', async (req, res) => {
  const newColorName = new ColorName({
    name: req.body.name,
    hex: req.body.hex,
    rgb: req.body.rgb
  })
  const returnedColor = await newColorName.save()
  res.status(200).json(returnedColor)
})

module.exports = colorNameRouter