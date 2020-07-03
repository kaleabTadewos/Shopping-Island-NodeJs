const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const ErrorResponse = require('../models/errorResponse');
const {port , environment} = require('../config.js')
const logger = require('./logger');

//routes
const userRoutes = require('../routes/user.route');
const adminOnlyRoutes = require('../routes/adminOnly.route');
const allUsersRoutes = require('../routes/allRoles.route');
const adminSellerRoutes = require('../routes/admin-seller.route');
const adminRoutes = require('../routes/admin.route');
//middlewares
const admin = require('../middleware/admin');
const adminSeller = require('../middleware/admin-seller');
const adminOnly = require('../middleware/adminOnly');
const allRoles = require('../middleware/allRoles');
const auth = require('../middleware/auth');
const error = require('../middleware/error');

module.exports = function(app){
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
        return res.status(404).send(new ErrorResponse(404, 'no content found!'));
    });

    app.use(error);
}
