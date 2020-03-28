beforeAll(() => {
  global.$ = {
    config: {
      google_sheet: {
        id: '123',
        apikey: 'xxx-yyy-zzz'
      }
    }
  }
})

describe('#global', () => {
  test('init module', () => {
    require('lightship')
    jest.mock('lightship')
    const index = require('./index')
    expect(Object.keys(index).length).toEqual(4)
    const expected = [
      'log',
      'config',
      'errors',
      'readiness'
    ]
    expect(Object.keys(index)).toEqual(expected)
  })
})
