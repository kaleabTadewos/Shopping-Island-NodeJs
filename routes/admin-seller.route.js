const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

/* GET a user. */
router.put('/users/addCart', userController.addToCart);
module.exports = router;