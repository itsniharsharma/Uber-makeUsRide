const pilotModel = require('../models/pilot.model');
const { populate } = require('../models/user.model');

module.exports.createPilot = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
})=>{
    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fields are required');
    }

    const pilot = new pilotModel({
        username: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });

    return pilot;
}