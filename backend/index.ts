const PORT = process.env.PORT || 3001
import express from 'express'
import mongoose, { MongooseError } from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { colorNameRouter } from './routers/colorNameRouter'
import { paletteRouter } from './routers/paletteRouter'
import { userRouter, setSecret } from './routers/userRouter'
import { ncsConvertRouter } from './routers/ncsConvertRouter'
import { mdRouter } from './routers/mdRouter'
import { authenticateUser } from './middleware/authenticator'
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

const runServer = async () => {
  try {
    await mongoose.connect(mongoAdress)
    console.info('Connected to mongoDB')
  } catch (error) {
    if (error instanceof MongooseError)
      console.log(`Error connecting to database ${error.message}`)
  }

  app.use(cors())
  app.use(express.json())
  app.use(await authenticateUser(secret))
  app.get('/', (req, res) => {
    res.json({ test: 'test' })
  })

  app.use('/api/colors', colorNameRouter)
  app.use('/api/palettes', paletteRouter)
  app.use('/api/users', userRouter)
  app.use('/api/convertncs', ncsConvertRouter)
  app.use('/api/md', mdRouter)
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log('server operational on port', PORT)
  })
}

runServer()
