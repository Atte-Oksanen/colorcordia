const userRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { MongooseError, default: mongoose } = require('mongoose')
const User = require('../models/user')


userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const authenticated = user === null ? false : await bcrypt.compare(password, user.password)
  if (!(authenticated && user)) {
    res.status(401).json({ message: "invalid username or password" })
    return
  }

  const tokenData = {
    username: user.username,
    id: user._id,
    lastLogin: Date.now()
  }
  const token = jwt.sign(tokenData, process.env.SECRET)
  res.json({ token: token, username: user.username, id: user._id })
})

userRouter.post('/signup', async (req, res) => {
  if (req.body.username.length < 3) {
    return res.status(400).json({ message: "username must be atleast 3 characters long" })
  }
  else if (await User.findOne({ username: req.body.username })) {
    return res.status(400).json({ message: "username already taken" })
  }
  else if (req.body.password.length < 8) {
    return res.status(400).json({ message: "password must be atleast 8 characters long" })
  }
  else if (!req.body.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9!@#\$%\^&\*])(.{8,})$/)) {
    return res.status(400).json({ message: "password must include uppercase and lowercase letters, and atleast one number or special character" })
  }
  else if (!req.body.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return res.status(400).json({ message: "invalid email address" })
  }

  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10)
  })
  res.json(await newUser.save())
})

userRouter.get('/usernames/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  if (!user) {
    res.json({ uniqueName: true })
  } else {
    res.json({ uniqueName: false })
  }
})

userRouter.get('/likedposts/:id', async (req, res) => {
  res.json((await User.findById(req.params.id)).likedPosts)
})

userRouter.get('/getuser/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "authorization needed" })
  } else if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "Invalid credentials" })
  }
  return res.json(await User.findById(req.params.id))
})

module.exports = userRouter
