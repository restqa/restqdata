beforeEach(() => {
  jest.resetModules()
})

describe('#Services - data', () => {
  describe('Get', () => {
    test('throw error if the channel doesnt\'t exist', () => {
      const data = require('./data')
      expect(() => {
        data.get('foo', 'users', 'row')
      }).toThrow(new Error('The channel "foo" doesn\'t exist. Available : google-sheets'))
    })

    test('Success - call channel function', () => {
      const Channels = require('./channels')
      jest.mock('./channels')

      Channels['foo-bar'] = jest.fn()

      const data = require('./data')
      data.get('foo-bar', 'users', 1)

      expect(Channels['foo-bar'].mock.calls.length).toBe(1)
      expect(Channels['foo-bar'].mock.calls[0][0]).toBe('users')
      expect(Channels['foo-bar'].mock.calls[0][1]).toBe(1)
    })
  })
})
