const config = require('config');
const logger = require('./logger');
require('express-async-errors');

module.exports = function() {

    process.on('uncaughtException' , (ex) => {
        logger.logError(ex.message);
    });
    
    process.on('unhandledRejection' , (ex) => {
        logger.logError(ex.message);
    });

    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}