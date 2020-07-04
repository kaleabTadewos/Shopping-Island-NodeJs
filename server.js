const app = require("./app");
const {port} = require('./config.js')

const connectionPort = port || 3000;

    app.listen(connectionPort, () => {
        console.log(`server is running on ${port} ...`);
    });
