beforeEach(() => {
  jest.resetModules()
})

describe('#controllers', () => {
  test('init module', () => {
    const index = require('./index')
    expect(Object.keys(index).length).toEqual(1)
    expect(Object.keys(index)).toEqual(['Data'])
  })
})
