/**
 In the restaurant kitchen analogy, 
 Routes serve as the pathways that guide specific types of customer orders (requests) 
 through the kitchen process. Each route directs a particular type of order to the appropriate part of the kitchen 
 for preparation and final delivery.

Routes Represent different pathways for handling various types of customer requests (or orders). For example:

/api/users for creating a user
/api/orders for placing and managing orders
/api/products for accessing product details
*/

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const {body} = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be 6 characters long'),
],
  userController.registerUser
)

module.exports = router; 