import fs from 'fs'
import express, { NextFunction, Request, Response } from 'express'
import { AxiosError } from 'axios'

export const mdRouter = express.Router()

/**
 * A function for fetching text for about page
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getAboutText = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ text: fs.readFileSync('./data/about_text.md').toString() })
  } catch (error) {
    next(new AxiosError('Internal server error', '500'))
  }
}

mdRouter.get('/about', (req, res, next) => getAboutText(req, res, next))