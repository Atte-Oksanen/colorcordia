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