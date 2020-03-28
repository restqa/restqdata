const express = require('express')
const Middlewares = require('./middlewares')
const Routes = require('./routes')

module.exports = express()
  .use('/data', Routes)
  .use(Middlewares.notFound)
  .use(Middlewares.errors)
