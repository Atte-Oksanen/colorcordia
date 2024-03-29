import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { colorConverter } from '../utils/colorConverters'
import { AttributeSkeleton, BrightnessAttributes, ColorNameInterface, SaturationAttributes } from '../types/colorTypes'
import { AxiosError } from 'axios'
import { validator } from '../utils/validator'
import { colorAttributor } from '../utils/colorAttributes'
import { ColorAttribute } from '../models/colorAttribute'

export const colorNameRouter = express.Router()

const tempColors: { name: string, hex: string }[] = JSON.parse(fs.readFileSync('./data/color_names.json').toString())
const colors = tempColors.map(element => { return { ...element, rgb: colorConverter.hexToRgb(element.hex) } })
console.info(`${colors.length} color names loaded`)

const colorAttributes: { attributes: string[] } = JSON.parse(fs.readFileSync('./data/colorAttributes.json').toString())
console.info(colorAttributes.attributes.length, 'color attributes loaded')

const getAllColorNames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (colors.length === 0) {
      throw new AxiosError('Internal server error', '500')
    }
    res.json(colors)
  } catch (error) {
    next(error)
  }
}

const getColorNameById = async (req: Request, res: Response, next: NextFunction) => {
  const hexArray = req.params.id.split('-')
  const returnArray: ColorNameInterface[] = []
  for (const element of hexArray) {
    const elementRgb = colorConverter.hexToRgb(element)
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
  }
  res.json(returnArray)
}

const receiveColorAttributes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attributeObj = validator.validateColorAttributes(req, colorAttributes.attributes)
    const colorClass = colorAttributor.getColorClasses(colorConverter.hexToHsv(attributeObj.hex))
    const attributeSkeleton = (await ColorAttribute.find({}))[0].toJSON() as AttributeSkeleton
    const attributeArr = attributeSkeleton[colorClass[0]][colorClass[1]][colorClass[2]]
    for (const attribute of attributeObj.attributes) {
      if (!attributeArr.find(element => element === attribute)) {
        attributeArr.push(attribute)
      }
    }
    await ColorAttribute.deleteMany({})
    const newAttributeSkeleton = new ColorAttribute(attributeSkeleton)
    await newAttributeSkeleton.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

const getColorAttributeCount = async (req: Request, res: Response, next: NextFunction) => {
  const attributeSkeleton = (await ColorAttribute.find({}))[0].toJSON() as AttributeSkeleton
  let count = 0
  for (const color in attributeSkeleton) {
    if (color === '__v') {
      break
    }
    for (const saturation in attributeSkeleton[color as keyof AttributeSkeleton]) {
      for (const brightness in attributeSkeleton[color as keyof typeof attributeSkeleton][saturation as keyof SaturationAttributes]) {
        count += attributeSkeleton[color as keyof typeof attributeSkeleton][saturation as keyof SaturationAttributes][brightness as keyof BrightnessAttributes].length
      }
    }
  }
  res.json({ count: count })
}

const getColorAttributeList = (req: Request, res: Response, next: NextFunction) => {
  res.json(colorAttributes)
}

const getColorAttributes = async (req: Request, res: Response, next: NextFunction) => {
  const body: string[] = req.body
  const attributeSkeleton = (await ColorAttribute.find({}))[0].toJSON() as AttributeSkeleton
  const attributes: string[] = []
  for (const color of body) {
    const classes = (colorAttributor.getColorClasses(colorConverter.hexToHsv(color)))
    attributes.push(...attributeSkeleton[classes[0]][classes[1]][classes[2]])
  }
  res.json([...new Set(attributes)])
}

colorNameRouter.get('/colorname', (req, res, next) => getAllColorNames(req, res, next))
colorNameRouter.get('/colorname/:id', (req, res, next) => getColorNameById(req, res, next))
colorNameRouter.post('/attribute', (req, res, next) => receiveColorAttributes(req, res, next))
colorNameRouter.get('/attribute', (req, res, next) => getColorAttributeList(req, res, next))
colorNameRouter.get('/attribute/count', (req, res, next) => getColorAttributeCount(req, res, next))
colorNameRouter.post('/attribute/getattributes', (req, res, next) => getColorAttributes(req, res, next))