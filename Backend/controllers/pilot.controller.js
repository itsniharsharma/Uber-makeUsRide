const blacklistTokenModel = require('../models/blacklistToken.model');
const pilotModel = require('../models/pilot.model');
const pilotService = require('../services/pilot.service');
const {validationResult} = require('express-validator');    

module.exports.registerPilot = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password, vehicle} = req.body;

    const pilotAlreadyExists = await pilotModel.findOne({email});

    if(pilotAlreadyExists){
        return res.status(400).json({message: 'Pilot already exists'});
    }

    const hashedPassword = await pilotModel.hashPassword(password);

    const pilot = await pilotService.createPilot({
        firstname,
        lastname,
        email,
        password,
        color,
        plate,
        capacity,
        vehicleType,
    });

    const token = pilot.generateAuthToken();

    res.status(201).json({message: 'Pilot created successfully', pilot});
}


module.exports.loginPilot = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const pilot = await pilotModel.findOne({email}).select('+password');

    if(!pilot){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await pilot.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = pilot.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({message: 'Pilot logged in successfully', token, pilot});
} 


module.exports.getPilotProfile = async (req, res, next) => {
    res.status(200).json({message: 'Pilot profile fetched successfully', pilot: req.pilot});
}


module.exports.logoutPilot = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message: 'Pilot logged out successfully'});
}