beforeEach(() => {
  jest.resetModules()
})

const Errors = require('./errors')

describe('#Global - Errors', () => {
  test('Has same key', () => {
    expect(Object.keys(Errors).length).toEqual(5)
    expect(Object.keys(Errors)).toEqual(['E401', 'E403', 'E404', 'E406', 'E500'])
  })

  test('Generate 401 Errors', () => {
    const expected = new Error('my error message')
    expected.httpStatus = 401

    expect(Errors.E401).toBeInstanceOf(Function)
    const err = new Errors.E401('my error message')
    expect(err).toBeInstanceOf(Error)
    expect(err.message).toBe('my error message')
    expect(err).toHaveProperty('httpStatus')
    expect(err.httpStatus).toBe(401)
  })

  test('Generate 403 Errors', () => {
    const expected = new Error('my error message')
    expected.httpStatus = 403

    expect(Errors.E403).toBeInstanceOf(Function)
    const err = new Errors.E403('my error message')
    expect(err).toBeInstanceOf(Error)
    expect(err.message).toBe('my error message')
    expect(err).toHaveProperty('httpStatus')
    expect(err.httpStatus).toBe(403)
  })

  test('Generate 404 Errors', () => {
    const expected = new Error('my error message')
    expected.httpStatus = 404

    expect(Errors.E404).toBeInstanceOf(Function)
    const err = new Errors.E404('my error message')
    expect(err).toBeInstanceOf(Error)
    expect(err.message).toBe('my error message')
    expect(err).toHaveProperty('httpStatus')
    expect(err.httpStatus).toBe(404)
  })

  test('Generate 406 Errors', () => {
    const expected = new Error('my error message')
    expected.httpStatus = 406

    expect(Errors.E406).toBeInstanceOf(Function)
    const err = new Errors.E406('my error message')
    expect(err).toBeInstanceOf(Error)
    expect(err.message).toBe('my error message')
    expect(err).toHaveProperty('httpStatus')
    expect(err.httpStatus).toBe(406)
  })

  test('Generate 500 Errors', () => {
    const expected = new Error('my error message')
    expected.httpStatus = 500

    expect(Errors.E500).toBeInstanceOf(Function)
    const err = new Errors.E500('my error message')
    expect(err).toBeInstanceOf(Error)
    expect(err.message).toBe('my error message')
    expect(err).toHaveProperty('httpStatus')
    expect(err.httpStatus).toBe(500)
  })
})
