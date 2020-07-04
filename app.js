const express = require('express');
const app = express();
const {port} = require('./config.js')

require('./startup/errorHandler')();
require('./startup/database')();
require('./startup/routes')(app);

module.exports = app;
