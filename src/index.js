const Channels = require('./channels')

function getChannel (opt) {
  const ChannelFn = Channels[opt.channel]
  if (!ChannelFn) throw new Error(`The channel "${opt.channel}" doesn't exist. Available : ${Object.keys(Channels).join(', ')}`)
  return new ChannelFn(opt.config)
}

module.exports = {
  getChannel
}
