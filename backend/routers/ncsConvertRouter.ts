import fs from 'fs'
import { colorConverter } from '../utils/colorConverters'
import express, { NextFunction, Request, Response } from 'express'
import { NCS } from '../types/colorTypes'
import { AxiosError } from 'axios'

export const ncsConvertRouter = express.Router()

const ncsColors: NCS[] = JSON.parse(fs.readFileSync('./data/ncs_values.json').toString())

console.info(`${ncsColors.length} ncs colors loaded`)

/**
 * A function to transform a hex value to NCS. Responds to user with the closest possible color.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const hexToNcs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchedRgb = colorConverter.hexToRgb(req.params.id)
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
    if (error instanceof Error) {
      next(new AxiosError(error.message, '400'))
    } else {
      next(new AxiosError('Internal server error', '500'))
    }
  }
}

/**
 * A function to transform a NCS value to hex. Responds to user with the NCS color in hex.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const ncsToHex = (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchedColor = ncsColors.find(element => element.ncs === req.params.id)
    if (!searchedColor) {
      throw new AxiosError('Invalid ncs notation', '400')
    }
    return res.json(searchedColor.hex)
  } catch (error) {
    if (error instanceof AxiosError) {
      next(error)
    } else {
      next(new AxiosError('Internal server error', '500'))
    }
  }
}

ncsConvertRouter.get('/hex/:id', async (req, res, next) => hexToNcs(req, res, next))
ncsConvertRouter.get('/ncs/:id', async (req, res, next) => ncsToHex(req, res, next))
