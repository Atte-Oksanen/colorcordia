const colorNameRouter = require('express').Router()
const ColorName = require('../models/colorName')
const { hexToRgb } = require('../utils/colorConverters')
const colors = [];

(async () => {
  const tempColors = (await ColorName.find({}))
  tempColors.forEach(element => {
    colors.push(element)
  });
  console.log(`${colors.length} color names loaded`)
})()


colorNameRouter.get('/', async (req, res) => {
  res.json(colors)
})

colorNameRouter.get('/:id', async (req, res) => {
  const hex = req.params.id

  const rgb = hexToRgb(hex)
  let closestName = colors[0]
  let distanceToName = Math.sqrt(Math.pow(rgb.r - colors[0].rgb.r, 2) + Math.pow(rgb.g - colors[0].rgb.g, 2) + Math.pow(rgb.b - colors[0].rgb.b, 2))
  for (let index = 1; index < colors.length; index++) {
    let newDistance = Math.pow(Math.pow(rgb.r - colors[index].rgb.r, 2) + Math.pow(rgb.g - colors[index].rgb.g, 2) + Math.pow(rgb.b - colors[index].rgb.b, 2), 0.5)
    if (newDistance < distanceToName) {
      distanceToName = newDistance
      closestName = colors[index]
    }
  }
  res.json(closestName)
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