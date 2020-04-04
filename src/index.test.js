beforeEach(() => {
  jest.resetModules()
})

describe('#Services - data', () => {
  test('Available methods', () => {
    const data = require('./index')
    expect(Object.keys(data)).toEqual(['getChannel'])
  })

  describe('GetChannel', () => {
    test('throw error if the channel doesnt\'t exist', () => {
      const data = require('./index')
      expect(() => {
        const options = {
          channel: 'foo'
        }
        data.getChannel(options)
      }).toThrow(new Error('The channel "foo" doesn\'t exist. Available : google-sheet, confluence, csv'))
    })

    test('Success - call channel function', () => {
      const Channels = require('./channels')
      jest.mock('./channels')

      Channels['foo-bar'] = jest.fn()

      const data = require('./index')
      const options = {
        channel: 'foo-bar',
        config: {
          key: 'users'
        }
      }
      data.getChannel(options)

      expect(Channels['foo-bar'].mock.calls.length).toBe(1)
      expect(Channels['foo-bar'].mock.calls[0][0]).toEqual({ key: 'users' })
    })
  })
})
