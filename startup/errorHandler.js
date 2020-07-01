const config = require('../config');

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