require('express-async-errors');
const {port , environment} = require('./config.js')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const ApiResponse = require('./models/apiResponse');
const ErrorResponse = require('./models/errorResponse');
const adminRoutes = require('./routes/admin.route');
const logger = require('./util/logger');

const userRoutes = require('./routes/user.route');
const loginRoutes = require('./routes/login.route');
const adminOnlyRoutes = require('./routes/adminOnly.route');
const allUsersRoutes = require('./routes/allRoles.route');
const adminSellerRoutes = require('./routes/admin-seller.route');
const admin = require('./middleware/admin');
const adminSeller = require('./middleware/admin-seller');
const adminOnly = require('./middleware/adminOnly');
const allRoles = require('./middleware/allRoles');
const auth = require('./middleware/auth');
const config = require('config');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');

process.on('uncaughtException' , (ex) => {
    logger.logError(ex.message);
})

process.on('unhandledRejection' , (ex) => {
    logger.logError(ex.message);
})

//throw new Error('some thing is broken here outside of express scope!');

if (!config.get('jwtPrivateKey')) {
    console.log(config.get('jwtPrivateKey'))
    console.error('jwtPrivateKey is not defined')
    process.exit(1);
}

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
//morgan configuration
if(environment == 'development'){
    app.use(morgan('tiny'));
}
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/all-users', [auth, allRoles], allUsersRoutes);
app.use('/admin-seller', [auth, adminSeller], adminSellerRoutes);
app.use('/admin-only', [auth, adminOnly], adminOnlyRoutes);

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use((req, res, next) => {
    logger.logInfo(`no content found! for url ${req.url}`);
    return res.status(404).send(new ErrorResponse(400, 'no content found!'));
});

app.use((err, req, res, next) => {
    logger.logError(err.message);
    return res.status(500).send(new ErrorResponse(500, err));
});


mongoose.connect('mongodb://localhost:27017/Island-shopping', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => {
            console.log("server is running on 3000 ...");
        })
    }).catch((err) => console.log(err));