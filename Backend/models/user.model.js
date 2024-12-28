/*just like in subway, we say to put this and not to put this, 
models are set of instruction to add more salt or sugar etc*/

//user.model.js means, set of instructions for how user dish is made, how much salt etc


const mongoose = require('mongoose'); //the active helper chef which access to crockery

//the recipe of the dish/ instructions to make the dish
const userSchema = new mongoose.Schema({
    username: {
        firstname: {
            type: String,
            required: true,
            minlength:[3,'first name must be 3 characters long'],
        },

        lastname:{
            type: String,
            minlength:[3,'last name must be 3 characters long'],
        },
    },

    email:{
        type: String,
        required: true,
        unique: true,
        minlength:[5, 'email must be 5 characters long'],
    },

    password:{
        type: String,
        required: true,
    },

    socketId:{
        type: String,
    },
}) 