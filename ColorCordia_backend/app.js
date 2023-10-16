const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const mongoAdress = process.env.MONGODB_URI
const colorNameRouter = require('./routers/colorNames')
const cors = require('cors')

mongoose.connect(mongoAdress).then(() => {
  console.log('connected to database')
}).catch((error) => {
  console.log(`Error connecting to database ${error.message}`)
})


app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.json({ test: "test" })
})

app.use('/api/colors', colorNameRouter)



module.exports = app