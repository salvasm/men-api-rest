import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level} \t${message}`;
});

let config = {
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

let logger = createLogger(config);

export default logger;