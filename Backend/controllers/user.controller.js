/*
 Controller:
The controller acts like a writer sitting inside the kitchen (app.js), having records of customer writing on register 
receiving instructions/orders from the server (servant).
It takes these raw, sometimes vague orders from the server and refines them into clear, structured instructions for the model.
The controller processes the order, ensuring secure handling—like authenticating user details and refining the inputs (e.g., hashing passwords with Bcrypt) at a primary level.
After refining and validating the request, it passes the refined, secure instructions to Mongoose (the active chef) for handling in the database (crockery).
 */

//took the customer crude written details 
const userModel = require('../models/user.model'); 
const UserService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

//created a route to register user
module.exports.registerUser = async (req, res, next) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }

     console.log(req.body);

     const {fullname, email, password} = req.body;

     const isUserAlreadyExists = await userModel.findOne({email});
     if(isUserAlreadyExists){
         return res.status(400).json({message: 'User already exists'});
     }

     const hashedPassword = await userModel.hashPassword(password);

     const user = new userModel({
            username: {
                firstname,
                lastname,
            },
            email,
            password: hashedPassword,
     });

     const token = user.generateAuthToken();

     res.status(201).json({token, user});
}


module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    console.log(req.body); // Check email and password values
    // console.log('Input Password:', password);
    // console.log('Hashed Password in DB:', user.password);


    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, user});
}

module.exports.getProfile = async (req, res, next) => {
    res.status(200).json({user: req.user});
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.status(200).json({message: 'Logged out successfully'});
}