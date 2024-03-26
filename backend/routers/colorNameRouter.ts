import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { colorConverter } from '../utils/colorConverters'
import { ColorNameInterface } from '../types/colorTypes'
import { AxiosError } from 'axios'

export const colorNameRouter = express.Router()

const tempColors: { name: string, hex: string }[] = JSON.parse(fs.readFileSync('./data/color_names.json').toString())
const colors = tempColors.map(element => { return { ...element, rgb: colorConverter.hexToRgb(element.hex) } })
console.info(`${colors.length} color names loaded`)

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
  hexArray.forEach(element => {
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
  })
  res.json(returnArray)
}

colorNameRouter.get('/', (req, res, next) => getAllColorNames(req, res, next))
colorNameRouter.get('/:id', (req, res, next) => getColorNameById(req, res, next))
