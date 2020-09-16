const winston = require('winston');
require('winston-daily-rotate-file');

const {combine, timestamp, label, printf} = winston.format;

const myFormat = printf(({level,message,timestamp}) => {
    return `${timestamp}__${level}__${message}&&&&`;
});

// level 0: error 1 : warn 2: info 3: http 4: verbose 5: debug 6: silly

const transport_all = new winston.transports.DailyRotateFile({
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  dirname: "logs",
  maxSize: '20m',
  maxFiles: '14d'
});

const transport_error = new winston.transports.DailyRotateFile({
    filename: 'ERROR_%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    dirname: "logs",
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error'
  });

const logger = winston.createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
    ),
  transports: [
    transport_all,
    transport_error
  ]
});

logger.info('Hello World!');

module.exports ={logger};