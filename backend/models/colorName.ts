import { Schema, model } from "mongoose"
import { ColorNameInterface } from "../types/colorTypes"

const colorNameSchema = new Schema<ColorNameInterface>({
  name: { type: String },
  hex: { type: String },
  rgb: {
    r: { type: Number },
    g: { type: Number },
    b: { type: Number },
  }
})

colorNameSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

export const ColorName = model('ColorName', colorNameSchema)