/*
Middleware:
The security guards, quality inspectors, or prep stations in the workflow.
Intercepts the request and ensures:
Authentication: Is the customer allowed to place this order? (e.g., JWT).
Validation: Is the order/request valid and complete? (e.g., input validation).
Preprocessing: Prepares data in the right format for the controller.
Middleware works between the routes and controllers.*/

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
}