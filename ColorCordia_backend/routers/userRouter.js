const userRouter = require('express').Router()
const { MongooseError, default: mongoose } = require('mongoose')
const User = require('../models/user')

userRouter.post('/login', (req, res) => {
    console.log(req.body)
})

userRouter.post('/signup', async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
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

module.exports = userRouter
