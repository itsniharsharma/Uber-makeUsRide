//Hello I am the servent 

const http = require('http'); //the ordering notepad
const app = require('./app'); //the main kitchen 
const port = process.env.PORT || 3000;

const server = http.createServer(app); //the manager/waiter 

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});  //servent is listening from window 3000