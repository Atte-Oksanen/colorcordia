import { Schema, model } from 'mongoose'
import { PaletteInterface } from '../types/mongooseTypes'


const paletteSchema = new Schema<PaletteInterface>({
  name: { type: String },
  palette: { type: String },
  user: { type: Object },
  likes: { type: Number },
  tags: [String]
})


paletteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

export const Palette = model<PaletteInterface>('Palette', paletteSchema)