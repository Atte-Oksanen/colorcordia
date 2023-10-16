const mongoose = require('mongoose')

const ColorNameSchema = mongoose.Schema({
  name: { type: String },
  hex: { type: String },
  rgb: {
    r: { type: Number },
    g: { type: Number },
    b: { type: Number },
  }
})

ColorNameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('ColorName', ColorNameSchema)