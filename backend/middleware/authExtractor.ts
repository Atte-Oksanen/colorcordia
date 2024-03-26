import { NextFunction, Response } from 'express'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import { AxiosError } from 'axios'
import { RequestWithUser, TokenContent } from '../types/httpTypes'

/**
 * Middleware for extracting and validating bearer tokens
 * @param {string} secret Bearer token 
 * @throws {JsonWebTokenError, AxiosError}
 */
export const authExtractor = (secret: string) => (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authToken = req.get('authorization')
    if (!authToken) {
      return next()
    }
    const decodedToken = jwt.verify(authToken, secret) as JwtPayload
    if (!decodedToken.username || !decodedToken.id || !decodedToken.lastLogin || !decodedToken.remoteAddress) {
      throw new JsonWebTokenError('Invalid token provided')
    }
    if (Date.now() - decodedToken.lastLogin > 604800000) {
      throw new AxiosError('Last login was too long ago - please login again', '440')
    }
    if (decodedToken.remoteAddress !== req.socket.remoteAddress) {
      throw new AxiosError('Invalid token provided', '401')
    }
    req.user = decodedToken as TokenContent
  } catch (error) {
    return next(error)
  }
  next()
}