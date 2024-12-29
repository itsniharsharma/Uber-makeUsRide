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
const blacklistTokenModel = require('../models/blacklistToken.model');
const pilotModel = require('../models/pilot.model');

module.exports.authUser = async (req, res, next) => {
    try {

        /**
Customer arrives at the restaurant (makes a request).
Security guard (middleware) checks for the customer's badge (token) in their wallet (cookies) or hand (headers).
If the customer doesn’t have a badge, they are turned away.
If the customer has a badge, the guard checks whether it’s on the blacklist:
If yes, the customer is still turned away.
If no, the customer is allowed to proceed into the restaurant.

         */

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const blacklisted = await blacklistTokenModel.findOne({token: token});

        if(blacklisted){
            return res.status(401).json({ message: 'Authentication failed' });
        } //here is checking if imposter enter, get him kick out of the restaurant

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
}


module.exports.authPilot = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const blacklisted = await blacklistTokenModel.findOne({token: token});

        if(blacklisted){
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const pilot = await pilotModel.findById(decoded._id);
        req.pilot = pilot;
        return next();

    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
}