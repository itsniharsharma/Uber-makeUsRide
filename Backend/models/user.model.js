/*just like in subway, we say to put this and not to put this, 
models are set of instruction to add more salt or sugar etc*/

//user.model.js means, set of instructions for how user dish is made, how much salt etc


const mongoose = require('mongoose'); //the active helper chef which access to crockery
const bcrypt = require('bcrypt'); //to hash the order in cooks language
const jwt = require('jsonwebtoken'); //authenticate the customer order and put a steel cap over food and give it to the waiter


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
        select: false,
    },

    socketId:{
        type: String,
    },
}) 

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword){
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
}

userSchema.statics.hashPassword = async function(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

//This is a chit that mongoose(the helper cook) past on crockery 
const userModel = mongoose.model('user', userSchema);

module.exports = userModel; //exporting the chit to be used by the main cook (the server logic).