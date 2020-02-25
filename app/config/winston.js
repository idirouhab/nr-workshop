var winston = require('winston');
const newrelicFormatter = require('@newrelic/winston-enricher')
var {LogstashTransport} = require('winston-logstash-transport')

var options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    logstash: {
        level: 'info',
        host: process.env.LOGSTASH_HOST || "localhost",
        port: process.env.LOGSTASH_PORT || 28777,
        handleExceptions: true,
        json: true,
    },
};


var logger = new winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new LogstashTransport(options.logstash)
    ],
    format: winston.format.combine(
        newrelicFormatter()
    ),
    exitOnError: false,
});

logger.stream = {
    write: function(message) {
        logger.info(message);
    },
};

module.exports = logger;
