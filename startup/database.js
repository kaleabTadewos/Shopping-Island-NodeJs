const mongoose = require('mongoose');
const logger = require('./logger');
//const {connectionString} = require('../config');
const config = require('config');

module.exports = function(){
    const connectionString = config.get('connectionString');
    mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        logger.logInfo('mongodb is connected!!!')
    })
}