import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { colorNameRouter } from './routers/colorNameRouter'
import { paletteRouter } from './routers/paletteRouter'
import { userRouter, setSecret } from './routers/userRouter'
import { ncsConvertRouter } from './routers/ncsConvertRouter'
import { mdRouter } from './routers/mdRouter'
import { authExtractor } from './middleware/authExtractor'
import { errorHandler } from './middleware/errorhandler'

dotenv.config()

export const app = express()

const mongoAdress = process.env.MONGODB_URI
const secret = process.env.SECRET

if (!mongoAdress) {
  throw new Error('Provide URI for MongoDB')
}
if (!secret) {
  throw new Error('Provide a secret for password encryption')
}

setSecret(secret)

mongoose.connect(mongoAdress).then(() => {
  console.log('connected to database')
}).catch((error) => {
  console.log(`Error connecting to database ${error.message}`)
})

app.use(cors())
app.use(express.json())
app.use(authExtractor(secret))
app.get('/', (req, res) => {
  res.json({ test: 'test' })
})

app.use('/api/colors', colorNameRouter)
app.use('/api/palettes', paletteRouter)
app.use('/api/users', userRouter)
app.use('/api/convertncs', ncsConvertRouter)
app.use('/api/md', mdRouter)
app.use(errorHandler)