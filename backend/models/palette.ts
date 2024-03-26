import { Schema, model } from 'mongoose'
import { PaletteInterface } from '../types/mongooseTypes'


const paletteSchema = new Schema<PaletteInterface>({
  palette: { type: String },
  user: { type: Object },
  name: { type: String },
  likes: { type: Number }
})


paletteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

export const Palette = model<PaletteInterface>('Palette', paletteSchema)