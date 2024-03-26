import { Schema, model } from 'mongoose'
import { UserInterface } from '../types/mongooseTypes'

const userSchema = new Schema<UserInterface>({
  username: { type: String },
  password: { type: String },
  likedPosts: [String]
})


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

export const User = model('User', userSchema)