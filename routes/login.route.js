var express = require('express');
var router = express.Router();
const securityController = require('../controller/security.controller');
const auth = require('../controller/authentication.controller');


/* GET users listing. */
router.post('/register', securityController.insert);
router.post('/login', auth.login);

module.exports = router