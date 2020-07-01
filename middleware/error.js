const logger = require('../startup/logger');

module.exports = function(err , req, res, next){
    logger.logError(err.message);
    return res.status(500).send(new ErrorResponse(500, err));
};