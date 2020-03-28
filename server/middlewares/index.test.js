describe('#Middleware', () => {
  test('init module', () => {
    const index = require('./index')
    expect(Object.keys(index).length).toEqual(2)
    const expected = [
      'notFound',
      'errors'
    ]
    expect(Object.keys(index)).toEqual(expected)
  })
})
