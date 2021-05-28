const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}\t${message}`;
});

var config = {
    format: combine(
        timestamp(),
        format.colorize(),
        format.json(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        prettyPrint(),
        myFormat
    ),
    'transports': [
        new transports.Console()
    ]
};

var logger = createLogger(config);

module.exports = logger;