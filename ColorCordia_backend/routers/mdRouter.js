const { mdToHtml } = require('../utils/mdToHtml')
const fs = require('fs')
const mdRouter = require('express').Router()

mdRouter.get('/about', (req, res) => {
  res.json(mdToHtml(fs.readFileSync('./data/about_text.md').toString()))
})
module.exports = mdRouter