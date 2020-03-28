const NotFound = require('./notFound')

beforeEach(() => {
  global.$.log = {
    debug: msg => console.log(msg),
    info: () => {},
    error: () => {}
  }
  jest.resetModules()
})

describe('#Middleware - notFound', () => {
  test('Throw an error if the route is not found', () => {
    const req = {}
    const res = {}
    const next = jest.fn()

    NotFound(req, res, next)

    expect(next.mock.calls.length).toBe(1)

    expect(next.mock.calls[0][0]).toBeInstanceOf(Error)
    expect(next.mock.calls[0][0].message).toBe('No API found with those values')
    expect(next.mock.calls[0][0].httpStatus).toBe(404)
  })
})
