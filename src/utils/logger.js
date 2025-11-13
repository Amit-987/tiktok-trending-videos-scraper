onst { createLogger, format, transports } = require('winston');

const logLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.printf((info) => {
      const { timestamp, level, message, stack, ...meta } = info;
      const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      const base = `${timestamp} [${level.toUpperCase()}] ${message}`;
      return stack ? `${base} ${stack}${metaString}` : `${base}${metaString}`;
    }),
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;