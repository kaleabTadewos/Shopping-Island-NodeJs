const express = require('express');
const app = express();
const {port} = require('./config.js')


require('./startup/errorHandler');
require('express-async-errors');
require('./startup/database')();
require('./startup/routes')(app);

const connectionPort = port || 3000;
app.listen(connectionPort, () => {
    console.log(`server is running on ${port} ...`);
});
