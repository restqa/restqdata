beforeEach(() => {
  jest.resetModules()
})

describe('#utils/logger - Logger class', () => {
  test('Create winston instance', () => {
    const winston = require('winston')
    process.env.NODE_ENV = 'test'

    jest.mock('winston')
    winston.createLogger = jest.fn()
    winston.transports = {
      Console: jest.fn().mockImplementation(() => 'Console'),
      File: jest.fn()
    }
    winston.format = {
      json: jest.fn().mockImplementation(() => 'json'),
      simple: jest.fn().mockImplementation(() => 'simple')

    }

    require('./logger.js')

    expect(winston.createLogger.mock.calls.length).toBe(1)
    expect(Object.keys(winston.createLogger.mock.calls[0][0])).toEqual(['format', 'transports'])

    expect(winston.transports.Console.mock.calls.length).toBe(1)
    expect(winston.transports.File.mock.calls.length).toBe(0)
    expect(winston.format.simple.mock.calls.length).toBe(1)
  })

  test('Add transporter for proudction config', () => {
    const winston = require('winston')
    process.env.NODE_ENV = 'production'

    jest.mock('winston')
    const add = jest.fn()
    winston.createLogger = jest.fn().mockReturnValue({
      add
    })

    winston.transports = {
      Console: jest.fn(),
      File: jest.fn()
    }

    let fn = null

    winston.format = {
      simple: jest.fn(),
      printf: jest.fn(_fn => {
        fn = _fn
        return 'customJsonFormat'
      })
    }

    require('./logger.js')

    expect(winston.createLogger.mock.calls.length).toBe(1)
    expect(winston.transports.Console.mock.calls.length).toBe(1)
    expect(winston.transports.File.mock.calls.length).toBe(1)
    expect(winston.format.printf.mock.calls.length).toBe(1)
    expect(add.mock.calls.length).toBe(1)
    const optionsFile = {
      format: 'customJsonFormat',
      filename: '/var/logs/microservice/app.log',
      maxsize: 10000000,
      maxFiles: 5
    }
    expect(winston.transports.File.mock.calls[0][0]).toEqual(optionsFile)

    // customJsonFormat
    global.$ = {}
    global.Date = jest.fn(() => {
      return {
        toISOString: () => 'my-time'
      }
    })

    let result = fn({
      level: 'info',
      message: 'msg'
    })
    expect(result).toEqual(JSON.stringify({
      message: 'msg',
      level: 'info',
      timestamp: 'my-time'
    }))

    $.namespace = {
      get: jest.fn().mockReturnValue('xxx-xxx-xxx')
    }

    result = fn({
      level: 'info1',
      message: 'msg1'
    })

    expect(result).toEqual(JSON.stringify({
      message: 'msg1',
      level: 'info1',
      timestamp: 'my-time',
      'correlation-id': 'xxx-xxx-xxx'
    }))
  })
})
