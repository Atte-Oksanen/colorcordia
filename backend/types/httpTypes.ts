import { Request } from "express"

export interface TokenContent {
  username: string,
  id: string,
  lastLogin: number,
  remoteAddress: string
}

export interface RequestWithUser extends Request {
  user?: TokenContent
}

export interface UserCreds {
  username: string,
  password: string
}

export interface PasswordChangeObject {
  username: string,
  currentPassword: string,
  newPassword: string
}