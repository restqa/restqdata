describe('#config', () => {
  test('Has same key', () => {
    const config = require('./config')
    expect(config).toHaveProperty('port')
    expect(config).toHaveProperty('env')
    expect(config).toHaveProperty('google_sheet')
  })
})
