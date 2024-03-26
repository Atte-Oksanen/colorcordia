import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/user'
import { checkProfanity } from '../utils/checkProfanity'
import { AxiosError } from 'axios'
import { MongooseError } from 'mongoose'
import { RequestWithUser } from '../types/httpTypes'

export const userRouter = express.Router()

let secret = ''

/**
 * Setter for enviroment secret used for password hashing
 * @param {string} tempSecret 
 */
export const setSecret = (tempSecret: string) => {
  secret = tempSecret
}

/**
 * Function to handle loggin in. Responds to client with a bearer token
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (secret === '') {
      throw new Error('enviroment secret not available - Login not possible')
    }
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      throw new AxiosError('Username not found', '404')
    }
    const authenticated = await bcrypt.compare(password, user.password)
    if (!authenticated) {
      throw new AxiosError('Invalid username or password', '401')
    }
    const tokenData = {
      username: user.username,
      id: user._id,
      lastLogin: Date.now(),
      remoteAddress: req.socket.remoteAddress
    }
    const token = jwt.sign(tokenData, secret)
    res.json({ token: token, username: user.username, id: user._id })
  } catch (error) {
    next(error)
  }
}

/**
 * Function to handle signup. Responds to client with user details
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.username.length < 3) {
      throw new AxiosError('Username must be atleast 3 characters long', '400')
    }
    if (!req.body.username.match(/^[a-zA-Z0-9_-]+$/)) {
      throw new AxiosError('Username cannot include special characters', '400')
    }
    if (checkProfanity(req.body.username)) {
      throw new AxiosError('Username must not contain any profanities', '400')
    }
    else if (await User.findOne({ username: req.body.username })) {
      throw new AxiosError('Username already in use', '400')
    }
    else if (req.body.password.length < 8) {
      throw new AxiosError('Password must be atleas 8 characters long', '400')
    }
    else if (!req.body.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9!@#\$%\^&\*])(.{8,})$/)) {
      throw new AxiosError('Password must include uppercase and lowercase letters, and atleast one number or special character', '400')
    }

    const newUser = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10)
    })
    res.json(await newUser.save())
  } catch (error) {
    next(error)
  }
}

/**
 * Function for checking if a username is already in use. Responds to client with a boolean
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const checkUniqueUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      res.json({ uniqueName: true })
    } else {
      res.json({ uniqueName: false })
    }
  } catch (error) {
    next(error)
  }
}

/**
 * Function to fetch users liked posts. Responds to client with an array of liked posts
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getLikedPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      throw new MongooseError('User not found')
    }
    res.json(user.likedPosts)
  } catch (error) {
    next(error)
  }
}

/**
 * Function for fetching a user by id. Responds to client with user details.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AxiosError('Login needed for this action', '401')
    } else if (req.user.id !== req.params.id) {
      throw new AxiosError('Invalid credentials', '401')
    }
    res.json(await User.findById(req.params.id))
  } catch (error) {
    next(error)
  }
}

/**
 * Function to handle password changing. Responds to client with user details.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const changePassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AxiosError('Login needed for this action', '401')
    }
    const { username, currentPassword, newPassword } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      throw new AxiosError('Username not found', '404')
    }
    const authenticated = await bcrypt.compare(currentPassword, user.password)
    if (!authenticated) {
      throw new AxiosError('Invalid username or password', '401')
    }
    if (newPassword.length < 8) {
      throw new AxiosError('Password must be atleast 8 characters long', '400')
    }
    if (newPassword === currentPassword) {
      throw new AxiosError('Current and new passwords cannot be the same', '400')
    }
    else if (!newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9!@#\$%\^&\*])(.{8,})$/)) {
      throw new AxiosError('Password must include uppercase and lowercase letters, and atleast one number or special character', '400')
    }
    const updatedUser = {
      username: user.username,
      password: await bcrypt.hash(newPassword, 10),
      likedPosts: user.likedPosts
    }
    const returnedUser = await User.findByIdAndUpdate(user.id, updatedUser, { new: true })
    res.status(200).json(returnedUser)
  } catch (error) {
    next(error)
  }
}

/**
 * Function to handle user deletion. Responds with a status code.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AxiosError('Login needed for this action', '401')
    } else if (req.user.id !== req.params.id) {
      throw new AxiosError('Invalid credentials', '401')
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).end()
  } catch (error) {
    next(error)
  }
}

userRouter.post('/login', async (req, res, next) => login(req, res, next))
userRouter.post('/signup', async (req, res, next) => signUp(req, res, next))
userRouter.get('/usernames/:username', async (req, res, next) => checkUniqueUsername(req, res, next))
userRouter.get('/likedposts/:id', async (req, res, next) => getLikedPosts(req, res, next))
userRouter.get('/getuser/:id', async (req, res, next) => getUser(req, res, next))
userRouter.post('/password', async (req, res, next) => changePassword(req, res, next))
userRouter.delete('/delete/:id', async (req, res, next) => deleteUser(req, res, next))
