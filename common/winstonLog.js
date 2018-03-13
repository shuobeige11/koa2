const winston = require('winston');
const path = require('path');

const logInfoFile = path.resolve(__dirname, '../logs/log-warn.log')
const logErrorFile = path.resolve(__dirname, '../logs/log-error.log')
const logDebugFile = path.resolve(__dirname, '../logs/log-debug.log')


const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({
        name: 'log-info',
        maxsize: 81920,
        filename: logInfoFile,
        handleExceptions: true,
        level: 'warn'
      }),
      new (winston.transports.File)({
        name: 'log-error',
        maxsize: 81920,
        filename: logErrorFile,
        handleExceptions: true,
        level: 'error'
      }),
      new (winston.transports.File)({
        name: 'log-debug',
        maxsize: 81920,
        filename: logDebugFile,
        handleExceptions: true,
        level: 'debug'
      })
    ]
})

module.exports = logger
