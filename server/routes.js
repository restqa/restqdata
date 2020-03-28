const Router = require('express').Router()
const Controllers = require('./controllers')

module.exports = Router
  .get('/:resource/:row', Controllers.Data.get)
