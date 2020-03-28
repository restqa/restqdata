const Channels = require('./channels')

function get (channel, resource, row) {
  const channelFn = Channels[channel]
  if (!channelFn) throw new Error(`The channel "${channel}" doesn't exist. Available : ${Object.keys(Channels).join()}`)
  return channelFn.call(this, resource, row)
}

module.exports = {
  get
}
