const winston = require('winston');
require('winston-mongodb');
const {connectionString} = require('../config');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
     // new winston.transports.Console({ format: winston.format.simple() }),
      new winston.transports.MongoDB({
        db: connectionString ,
        level: 'info'
      })
    ],
  });
   
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
//   if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//       format: winston.format.simple(),
//     }));
//   }

 //warn , info , verbose , debug , silly

const logInfo = function(message){
    logger.log({
        level: 'info',
        message: message
    })
};

const logError = function(message){
    logger.log({
        level: 'error',
        message: message
    })
};

module.exports = {
    logInfo: logInfo , 
    logError: logError
  };