const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//the recipe of the dish/ instructions to make the dish
const pilotSchema = new mongoose.Schema({
    fullname: {
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
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },

    password:{
        type: String,
        required: true,
        select: false,
    },

    socketId:{
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'color must be 3 characters long'],
        },

        plate: {
            type: String,
            required: true,
            minlength: [3, 'plate must be 3 characters long'],
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, 'capacity must be at least 1'],
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
            default: 'car',
        },
    },

    location: {
        latitude:{
            type: Number,
        },

        longitude:{
            type: Number,
        }
    },
})


pilotSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

pilotSchema.methods.comparePassword = async function(enteredPassword){
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
}

pilotSchema.statics.hashPassword = async function(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const pilotModel = mongoose.model('pilot', pilotSchema);
module.exports = pilotModel;