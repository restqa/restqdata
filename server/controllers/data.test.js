beforeEach(() => {
  jest.resetModules()
})

describe('#Controller - Data', () => {
  describe('#get', () => {
    test('Error if resource is not defined', () => {
      const req = {
        params: {}
      }
      const res = {
      }
      const next = jest.fn()

      require('./data').get(req, res, next)

      expect(next.mock.calls.length).toBe(1)
      expect(next.mock.calls[0][0]).toBeInstanceOf(Error)
      expect(next.mock.calls[0][0].httpStatus).toBe(406)
      expect(next.mock.calls[0][0].message).toBe('Please define the resource')
    })

    test('Error if row is not defined', () => {
      const req = {
        params: {
          resource: 'users'
        }
      }
      const res = {
      }
      const next = jest.fn()

      require('./data').get(req, res, next)

      expect(next.mock.calls.length).toBe(1)
      expect(next.mock.calls[0][0]).toBeInstanceOf(Error)
      expect(next.mock.calls[0][0].httpStatus).toBe(406)
      expect(next.mock.calls[0][0].message).toBe('Please define the row index')
    })

    test('Error if result throw an error', () => {
      const req = {
        params: {
          resource: 'users',
          row: 1
        }
      }
      const res = {
      }
      const next = jest.fn()

      const service = require('../services/data')
      jest.mock('../services/data')

      service.get = jest.fn()
      service.get.mockImplementation(() => { throw new $.errors.E404('Not Found') })

      require('./data').get(req, res, next)

      expect(next.mock.calls.length).toBe(1)
      expect(next.mock.calls[0][0]).toBeInstanceOf(Error)
      expect(next.mock.calls[0][0].httpStatus).toBe(404)
      expect(next.mock.calls[0][0].message).toBe('Not Found')
    })

    test('Success Scenario', async () => {
      const req = {
        params: {
          resource: 'users',
          row: 1
        }
      }
      const res = {
        json: jest.fn()
      }
      const next = jest.fn()

      const service = require('../services/data')
      jest.mock('../services/data')

      service.get.mockResolvedValue({ foo: 'bar' })

      await require('./data').get(req, res, next)

      expect(next.mock.calls.length).toBe(0)
      expect(res.json.mock.calls.length).toBe(1)
      expect(res.json.mock.calls[0][0]).toEqual({ foo: 'bar' })
    })
  })
})
