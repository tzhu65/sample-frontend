import * as winston from "winston";
const expressWinston: any = require("express-winston");

/**
 * Format log arguments into a log string.
 * @param options Arguments to be formatted
 */
function formatter(options: any): string {
  // Return string will be passed to logger
  return options.timestamp() + " " + options.level.toUpperCase() + " " + (options.message ? options.message : "") +
    (options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "" );
}

/**
 * Generate a custom ISO timestamp.
 */
function timestamp(): string {
  let timestamp = new Date().toISOString();
  timestamp = timestamp.replace("T", " ");
  timestamp = timestamp.replace("Z", "");
  return timestamp;
}

/**
 * Winston transport for printing to the console.
 */
const consoleTransport = new winston.transports.Console({
  formatter: (formatter),
  json: false,
  level: "debug",
  name: "console",
  timestamp: (timestamp),
});

/**
 * Default project logger.
 */
const logger = new winston.Logger({
  transports: [
    consoleTransport,
  ],
});

/**
 * Default express logger.
 */
const expressLogger = expressWinston.logger({
  colorize: true,
  expressFormat: true,
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  transports: [
    consoleTransport,
  ],
});

export { expressLogger, logger };
