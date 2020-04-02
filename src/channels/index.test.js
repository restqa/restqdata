describe('#services - Channels', () => {
  test('init module', () => {
    const index = require('./index')
    expect(Object.keys(index).length).toEqual(2)
    expect(Object.keys(index)).toEqual(['google-sheet', 'confluence'])
  })
})
