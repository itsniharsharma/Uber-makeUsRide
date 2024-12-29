const pilotController = require('../controllers/pilot.controller');
const express = require('express');
const router = express.Router();
const {body}= require('express-validator');


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isLength({min: 3}).withMessage('Vehicle type must be 3 characters long'),
],
  pilotController.registerPilot
)

module.exports = router;