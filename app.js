const express = require('express');
const app = express();
const {port} = require('./config.js')

require('./startup/errorHandler')();
require('./startup/database')();
require('./startup/routes')(app);

// process.on('uncaughtException' , (ex) => {
//     logger.logError(ex.message);
// });

// process.on('unhandledRejection' , (ex) => {
//     logger.logError(ex.message);
// });

const connectionPort = port || 3000;
app.listen(connectionPort, () => {
    console.log(`server is running on ${port} ...`);
});
