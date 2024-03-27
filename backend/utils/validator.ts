import { Request } from "express"
import { AxiosError } from "axios"
import { PasswordChangeObject, UserCreds } from "../types/httpTypes"
import badWords from 'naughty-words'
import { User } from "../models/user"
import { PaletteInterface } from "../types/mongooseTypes"
import { colorConverter } from "./colorConverters"


/**
 * Validates login credential structure and types
 * @param {Request} req 
 * @returns {LoginCreds} username and password
 * @throws {AxiosError} throws if type checking fails
 */
const validateUserCreds = (req: Request): UserCreds => {
  const body: UserCreds = req.body
  if (!body.password || !body.username) {
    throw new AxiosError('Invalid request body - body must containt password and username fields')
  }
  if (typeof body.password !== 'string' || typeof body.username !== 'string') {
    throw new AxiosError('Invalid request body - password and username fields must include strings')
  }
  return body
}

/**
 * Validates signup information
 * @param {Request} req 
 * @returns {Promise<UserCreds>}
 * @throws {AxiosError} function throws an exception if the validation fails
 */
const validateSignUpCreds = async (req: Request): Promise<UserCreds> => {
  const creds: UserCreds = validateUserCreds(req)
  await validateUsername(creds.username)
  validatePassword(creds.password)
  return creds
}

/**
 * Validates username on signup
 * @param {string} username 
 * @returns {Promise<string>} Returns username
 * @throws {AxiosError} Throws exception if validation fails
 */
const validateUsername = async (username: string): Promise<string> => {
  if (username.length < 3) {
    throw new AxiosError('Username must be atleast 3 characters long', '400')
  }
  if (!username.match(/^[a-zA-Z0-9_-]+$/)) {
    throw new AxiosError('Username cannot include special characters', '400')
  }
  if (checkProfanity(username)) {
    throw new AxiosError('Username must not contain any profanities', '400')
  }
  if (await User.findOne({ username: username })) {
    throw new AxiosError('Username already in use', '400')
  }
  return username
}

/**
 * Validates password on login and signup
 * @param {string} password 
 * @returns {Promise<string>} Returns password
 * @throws {AxiosError} Throws exception if validation fails
 */
const validatePassword = (password: string): string => {
  if (password.length < 8) {
    throw new AxiosError('Password must be atleas 8 characters long', '400')
  }
  if (!password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9!@#\$%\^&\*])(.{8,})$/)) {
    throw new AxiosError('Password must include uppercase and lowercase letters, and atleast one number or special character', '400')
  }
  return password
}

/**
 * Validates a new palette
 * @param {Request} req 
 * @returns {PaletteInterface}
 */
const validateNewPalette = (req: Request): PaletteInterface => {
  if (req.body.likes !== 0) {
    throw new AxiosError('New palettes must have 0 likes', '400')
  }
  return validatePalette(req)
}

/**
 * Validates color palette objects
 * @param {Request} req 
 * @returns {PaletteInterface}
 * @throws {AxiosError} throws exception when validation fails
 */
const validatePalette = (req: Request): PaletteInterface => {
  const body: PaletteInterface = req.body
  if (body.likes === undefined || !body.palette || !body.user) {
    throw new AxiosError('Palette must include palette and user fields', '400')
  }
  if (typeof body.likes !== 'number') {
    throw new AxiosError('Like field must include only numbers', '400')
  }
  if (!body.user.id || !body.user.username) {
    throw new AxiosError('User field must include username and id fields', '400')
  }
  if (typeof body.user.id !== 'string' || typeof body.user.username !== 'string') {
    throw new AxiosError('ID and username fields must include strings', '400')
  }
  validateColorPalette(body.palette)
  return body
}

/**
 * Validates color palette string
 * @param {string} palette 
 * @returns {string}
 * @throws {AxiosError} throws exception when validation fails
 */
const validateColorPalette = (palette: string): string => {

  const paletteTypes = [
    "Analogous",
    "Monochromatic",
    "Triad",
    "Complementary",
    "Split complementary",
    "Double Split Complementary",
    "Square",
    "Compound",
    "Shade",
  ]
  const paletteElements = palette.split('-')
  if (!paletteTypes.includes(paletteElements[0])) {
    throw new AxiosError('Palette name must be some of the following: Analogous, Monochromatic, Triad, Complementary, Split complementary, Double Split Complementary, Square, Compound, or Shade')
  }
  for (const color of paletteElements.slice(1)) {
    colorConverter.hexToRgb(color)
  }
  return palette
}

/**
 * Validates a password change object
 * @param {Request} req 
 * @returns {PasswordChangeObject}
 * @throws {AxiosError} throws exception when validation fails
 */
const validateNewPassword = (req: Request): PasswordChangeObject => {
  const body = req.body
  if (!body.username || !body.currentPassword || !body.newPassword) {
    throw new AxiosError('Body must include username, currentPassword, and newPassword fields', '400')
  }
  if (typeof body.username !== 'string' || typeof body.currentPassword !== 'string' || typeof body.newPassword !== 'string') {
    throw new AxiosError('Fields username, currentPassword, and newPassword must include strings', '400')
  }
  return body
}

/**
 * A function for checking profanities
 * @param {string} input 
 * @returns {boolean}
 */
const checkProfanity = (input: string): boolean => {
  const cleanedInput = input.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
    .replace(/4/g, 'a')
    .replace(/8/g, 'b')
    .replace(/3/g, 'e')
    .replace(/6/g, 'g')
    .replace(/0/g, 'o')
    .replace(/9/g, 'p')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/2/g, 'z')
  for (const property in badWords) {
    if (badWords[property as keyof typeof badWords].some(word => cleanedInput.replace(/1/g, 'i').includes(word)) || badWords[property as keyof typeof badWords].some(word => cleanedInput.replace(/1/g, 'l').includes(word))) {
      return true
    }
  }
  return false
}


export const validator = {
  validateUserCreds,
  validateSignUpCreds,
  validateUsername,
  validatePalette,
  validateNewPalette,
  validatePassword,
  validateNewPassword
}