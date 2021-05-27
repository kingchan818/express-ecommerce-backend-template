const winston = require('winston');

const logger = winston.createLogger({
    level: ['info', 'error'],
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(winston.format.colorize()),
        }),
        new winston.transports.Console({
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.prettyPrint(),
                winston.format.metadata()
            ),
        }),
    ],
});
process.on('unhandledRejection', (e) => {
    throw e;
});

process.on('uncaughtException', (e) => {
    throw e;
});

// winston.exceptions.unhandle(
//     new winston.transports.File({
//         filename: 'unhandle.log',
//         format: winston.format.json(),
//     })
// );

exports.log = logger;
