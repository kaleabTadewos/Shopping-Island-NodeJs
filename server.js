const app = require("./app");

const connectionPort = port || 3000;

    app.listen(connectionPort, () => {
        console.log(`server is running on ${port} ...`);
    });
