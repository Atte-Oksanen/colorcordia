import { AxiosError } from 'axios'
import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'


/**
 * Middleware for handling all exceptions thrown by routes
 * @param {Error} error 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AxiosError) {
    res.status(Number(error.code)).json({ message: error.message })
  } else if (error instanceof JsonWebTokenError) {
    res.status(400).json({ message: error.message })
  } else {
    res.status(500).json({ message: 'internal server error' })
  }
}