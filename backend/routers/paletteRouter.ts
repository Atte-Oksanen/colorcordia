import { Palette } from '../models/palette'
import { User } from '../models/user'
import express, { NextFunction, Request, Response } from 'express'
import { AxiosError } from 'axios'
import { PaletteInterface, UserInterface } from '../types/mongooseTypes'
import { MongooseError } from 'mongoose'
import { RequestWithUser } from '../types/httpTypes'
import { validator } from '../utils/validator'

export const paletteRouter = express.Router()

/**
 * Function for fetching all palettes. Responds to user with an array of palettes.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getAllPalettes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Palette.find({}))
  } catch (error) {
    next(error)
  }
}

/**
 * Function for fetching a palette by id. Responds to user with a palette.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getPaletteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const palette: PaletteInterface | null = await Palette.findById(req.params.id)
    if (!palette) {
      throw new AxiosError('Palette not found', '404')
    }
    res.json(palette)
  } catch (error) {
    next(error)
  }
}

/**
 * Function for creating a new palette. Responds to user with the new palette.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const createNewPalette = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AxiosError('This action requires logging in', '401')
    }
    const palette = validator.validateNewPalette(req)
    const newPalette = new Palette(palette)
    const returnedPalette = await newPalette.save()
    res.status(200).json(returnedPalette)
  } catch (error) {
    next(error)
  }
}

/**
 * Function for fetching liking and disliking a palette. Responds to user with an updated palette.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const likePalette = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AxiosError('This action requires logging in', '401')
    }
    const user: UserInterface | null = await User.findById(req.user.id)
    if (!user) {
      throw new MongooseError('User not found')
    }

    let updatedUser
    if (user.likedPosts.find(element => element === req.body.id)) {
      updatedUser = {
        username: user.username,
        password: user.password,
        likedPosts: user.likedPosts.filter(element => element !== req.body.id)
      }
    } else {
      updatedUser = {
        username: user.username,
        password: user.password,
        likedPosts: user.likedPosts.concat(req.body.id)
      }
    }
    const updatedPalette = validator.validateNewPalette(req)
    await User.findByIdAndUpdate(req.user.id, updatedUser, { new: true })
    const returnedPalette = await Palette.findByIdAndUpdate(req.params.id, updatedPalette, { new: true })
    res.status(200).json(returnedPalette)
  } catch (error) {
    next(error)
  }
}

/**
 * Function for deleting a palette by id. Responds to user with a status code.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const deletePalette = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AxiosError('This action requires logging in', '401')
    }
    const paletteFromDb: PaletteInterface | null = await Palette.findById(req.params.id)
    if (!paletteFromDb) {
      throw new MongooseError('Palette not found')
    }
    if (paletteFromDb.user.id !== req.user.id) {
      throw new AxiosError('Invalid credentials', '401')
    }
    await Palette.findByIdAndDelete(req.params.id)
    return res.status(200)
  } catch (error) {
    next(error)
  }
}

paletteRouter.get('/', async (req, res, next) => getAllPalettes(req, res, next))
paletteRouter.get('/:id', async (req, res, next) => getPaletteById(req, res, next))
paletteRouter.post('/', async (req, res, next) => createNewPalette(req, res, next))
paletteRouter.put('/:id', async (req, res, next) => likePalette(req, res, next))
paletteRouter.delete('/:id', async (req, res, next) => deletePalette(req, res, next))