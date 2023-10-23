const paletteRouter = require('express').Router()
const { MongooseError, default: mongoose } = require('mongoose')
const Palette = require('../models/palette')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

paletteRouter.get('/', async (req, res) => {
  res.json(await Palette.find({}))
})

paletteRouter.get('/:id', async (req, res) => {
  res.json(await Palette.findById(req.params.id))
})

paletteRouter.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "invalid credentials" })
  }
  const newPalette = new Palette({
    palette: req.body.palette,
    user: req.user,
    likes: req.body.likes
  })
  const returnedPalette = await newPalette.save()
  res.status(200).json(returnedPalette)
})

paletteRouter.put('/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "invalid credentials" })
  }
  const user = await User.findById(req.user.id)
  if (user.likedPosts.find(element => element === req.body.id)) {
    return res.status(401).json({ message: "post already liked" })
  }
  const updatedUser = {
    email: user.email,
    username: user.username,
    password: user.password,
    likedPosts: user.likedPosts.concat(req.body.id)
  }
  await User.findByIdAndUpdate(req.user.id, updatedUser, { new: true })
  const updatedPalette = {
    palette: req.body.palette,
    user: req.body.user,
    name: req.body.name,
    likes: req.body.likes
  }
  const returnedPalette = await Palette.findByIdAndUpdate(req.params.id, updatedPalette, { new: true })
  res.status(200).json(returnedPalette)
})

module.exports = paletteRouter
