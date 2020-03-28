beforeEach(() => {
  jest.resetModules()
})

describe('#routes', () => {
  test('load routes', () => {
    jest.mock('express')

    const Controllers = require('./controllers')
    jest.mock('./controllers')

    Controllers.Data = {
      get: 'c.data.get'
    }

    const Routes = require('./routes')

    expect(Routes.get.mock.calls.length).toBe(1)
    expect(Routes.get.mock.calls[0]).toEqual(['/:resource/:row', 'c.data.get'])
  })
})
