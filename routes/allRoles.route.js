const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const securityController = require('../controller/security.controller');

/* GET a user. */
router.get('/users', userController.findAll);
router.get('/me', securityController.getUserById);


module.exports = router;