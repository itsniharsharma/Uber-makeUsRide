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