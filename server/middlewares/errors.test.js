const Errors = require('./errors')

beforeEach(() => {
  global.$.log = {
    debug: msg => console.log(msg),
    info: () => {},
    error: () => {}
  }
  jest.resetModules()
})

describe('#Middleware - Errors', () => {
  test('Render json error', () => {
    const req = {}
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn()
    }
    const next = jest.fn()

    const err = {
      httpStatus: 404,
      message: 'Page not found'
    }

    Errors(err, req, res, next)

    expect(res.send.mock.calls.length).toBe(0)

    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(404)

    expect(res.json.mock.calls.length).toBe(1)
    expect(res.json.mock.calls[0][0]).toEqual({ message: 'Page not found' })
  })

  test('Render other error, as 500', () => {
    const req = {}
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }
    const next = jest.fn()

    const err = new Error('my 500 Error')

    Errors(err, req, res, next)

    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(500)

    expect(res.json.mock.calls.length).toBe(1)
    expect(res.json.mock.calls[0][0]).toEqual({ message: 'my 500 Error' })
  })
})
