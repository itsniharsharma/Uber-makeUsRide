/* mongoose is like skilled waiter inside the kitchen(app.js) 
 which is handding over the tools/ingridents from database(the crockery) 
 to main chef as he is demanding while making the dish */
const mongoose = require ('mongoose');


//this is the resumae of the waiter
function connectToDb(){
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected to the database');
    })
    .catch((error)=>{
        console.log('Error connecting to the database');
        console.log(error);
    });
}

module.exports = connectToDb; //exporting the function to be used in server.js
