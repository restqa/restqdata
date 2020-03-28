beforeEach(() => {
  jest.resetModules()
})

describe('#app', () => {
  test('load middlewares', () => {
    jest.mock('express')

    const Middlewares = require('./middlewares')
    jest.mock('./middlewares')

    Middlewares.errors = 'errors'
    Middlewares.notFound = 'notFound'

    const App = require('./app')

    expect(App.use.mock.calls.length).toBe(3)
    expect(App.use.mock.calls[0][0]).toBe('/data')
    expect(App.use.mock.calls[0][1]).toBeInstanceOf(Object)
    expect(App.use.mock.calls[1][0]).toBe('notFound')
    expect(App.use.mock.calls[2][0]).toBe('errors')
  })
})
