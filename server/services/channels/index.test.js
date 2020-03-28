describe('#services - Channels', () => {
  test('init module', () => {
    const index = require('./index')
    expect(Object.keys(index).length).toEqual(1)
    expect(Object.keys(index)).toEqual(['google-sheets'])
  })
})
