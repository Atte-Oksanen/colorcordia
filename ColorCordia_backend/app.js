const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const mongoAdress = process.env.MONGODB_URI
const colorNameRouter = require('./routers/colorNameRouter')
const cors = require('cors')
const paletteRouter = require('./routers/paletteRouter')
const userRouter = require('./routers/userRouter')
const jwt = require('jsonwebtoken')
const ncsConvertRouter = require('./routers/ncsConvertRouter')
const mdRouter = require('./routers/mdRouter')

const authExtractor = (req, res, next) => {
  try {
    req.user = (jwt.verify(req.get('authorization'), process.env.SECRET))
    if (Date.now() - req.user.lastLogin > 604800000) {
      return res.status(401).json({ message: "Manual login required" })
    }
    if (req.user.remoteAddress !== req.socket.remoteAddress) {
      return res.status(401).json({ message: "Invalid credentials" })
    }
  } catch (error) { }
  next()
}

mongoose.connect(mongoAdress).then(() => {
  console.log('connected to database')
}).catch((error) => {
  console.log(`Error connecting to database ${error.message}`)
})

app.use(cors())
app.use(express.json())
app.use(authExtractor)
app.get('/', (req, res) => {
  res.json({ test: "test" })
})

app.use('/api/colors', colorNameRouter)
app.use('/api/palettes', paletteRouter)
app.use('/api/users', userRouter)
app.use('/api/convertncs', ncsConvertRouter)
app.use('/api/md', mdRouter)

module.exports = app