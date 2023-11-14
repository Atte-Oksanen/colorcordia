const userRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { checkProfanity } = require('../utils/checkProfanity')

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
    lastLogin: Date.now(),
    remoteAddress: req.socket.remoteAddress
  }
  const token = jwt.sign(tokenData, process.env.SECRET)
  res.json({ token: token, username: user.username, id: user._id })
})

userRouter.post('/signup', async (req, res) => {
  if (req.body.username.length < 3) {
    return res.status(400).json({ message: "username must be atleast 3 characters long" })
  }
  if (!req.body.username.match(/^[a-zA-Z0-9_-]+$/)) {
    return res.status(400).json({ message: "username cannot include special characters" })
  }
  if (checkProfanity(req.body.username)) {
    return res.status(400).json({ message: "username must not contain any profanities" })
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

  const newUser = new User({
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

userRouter.post('/password', async (req, res) => {
  const { username, currentPassword, newPassword } = req.body
  const user = await User.findOne({ username })
  const authenticated = user === null ? false : await bcrypt.compare(currentPassword, user.password)
  if (!(authenticated && user)) {
    return res.status(401).json({ message: "invalid username or password" })
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ message: "password must be atleast 8 characters long" })
  }
  if (newPassword === currentPassword) {
    return res.status(400).json({ message: "Current and new passwords cannot be the same" })
  }
  else if (!newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9!@#\$%\^&\*])(.{8,})$/)) {
    return res.status(400).json({ message: "password must include uppercase and lowercase letters, and atleast one number or special character" })
  }
  const updatedUser = {
    username: user.username,
    password: await bcrypt.hash(newPassword, 10),
    likedPosts: user.likedPosts
  }
  const returnedUser = await User.findByIdAndUpdate(user.id, updatedUser, { new: true })
  res.status(200).json(returnedUser)
})

userRouter.delete('/delete/:id', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "authorization needed" })
  }
  if (req.params.id !== req.user.id) {
    return res.status(401).json({ message: "invalid token" })
  }
  try {
    await User.findByIdAndDelete(req.params.id)
  } catch (error) {
    return res.status(500).json({ message: "internal server error" })
  }
  res.status(200).end()
})

module.exports = userRouter
