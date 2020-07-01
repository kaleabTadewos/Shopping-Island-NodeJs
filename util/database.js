const mongoose = require('mongoose');
const logger = require('./logger');
const {connectionString} = require('../config');

module.exports = function(){
    mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        logger.logInfo('mongodb is connected!!!')
    })
}