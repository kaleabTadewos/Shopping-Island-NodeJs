const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const userController = require('../controller/user.controller');

const securityController = require('../controller/security.controller');
const authenticate = require('../controller/authentication.controller');


/* GET users listing. */
router.post('/register', securityController.insert);
router.post('/login', authenticate.login);
module.exports = router;

//const admin = require('../middleware/admin');

/* Get a user. */

/* Register a user user. */
// router.post('/', userController.registerUser);
// module.exports = router;