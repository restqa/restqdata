beforeEach(() => {
  jest.resetModules()
})

describe('#Global/readiness', () => {
  test('Create readiness', () => {
    const lightship = require('lightship')
    jest.mock('lightship')

    require('./readiness')

    expect(lightship.createLightship.mock.calls.length).toBe(1)
    expect(lightship.createLightship.mock.calls[0][0]).toEqual({ port: 9999 })
  })
})
