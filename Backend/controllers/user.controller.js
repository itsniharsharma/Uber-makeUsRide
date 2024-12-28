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


//created a route to register user
module.exports.registerUser = async (req, res, next) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }

     console.log(req.body);

     const {firstname, lastname, email, password} = req.body;

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