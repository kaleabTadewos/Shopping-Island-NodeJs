const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const securityController = require('../controller/security.controller');
const reviewController = require('../controller/review.controller');

/* GET a user. */
router.get('/users', userController.findAll);
router.put('/products/reviewStatus', reviewController.reviewStatus);
router.post('/products/productReview', reviewController.findByProductId);
router.put('/users/userStatus', securityController.updateUserById);
module.exports = router;