const winston = require('winston');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const fileRotateCombinedTransport = new winston.transports.DailyRotateFile({
  filename: 'log/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  zippedArchive: true,
});
const fileRotateErrorTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: 'log/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  zippedArchive: true,
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DDTHH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'avatar' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`.
    // - Write all logs error (and below) to `error.log`.
    //
    fileRotateCombinedTransport,
    fileRotateErrorTransport
  ],
  exitOnError: false,
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'prod') {
  logger.add(new transports.Console({
    format: format.cli(),
  }));
}

module.exports = logger;
