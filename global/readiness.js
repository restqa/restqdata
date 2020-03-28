const lightship = require('lightship')

// Lightship expose 2 endpoint /ready and /live for kubernetes

module.exports = lightship.createLightship({ port: 9999 })
