const mongoose = require('mongoose')

const PaletteSchema = mongoose.Schema({
  palette: { type: String },
  user: { type: Object },
  name: { type: String },
  likes: { type: Number }
})

PaletteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Palette', PaletteSchema)