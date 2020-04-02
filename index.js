const Data = require('./src')

function RestQData (options) {
  return Data.getChannel(options)
}

module.exports = RestQData
