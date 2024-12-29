/**
 Services act like specialized assistants that handle reusable logic or complex operations that don't 
 directly interact with the database. For example:

UserService could handle tasks like sending a welcome email or handling password resets.
OrderService could handle bulk data processing or calculations outside of the core CRUD operations.
In the analogy, services are helpers that assist both the controller and Mongoose (active chef) by performing 
additional processing or providing utility functions.


Final Refined Flow:
Customer places an order directly to the server (servant).

The server takes the order and passes it to the controller, acting as a middleman between the server and Mongoose (active chef).
The controller handles the request and sends it to the appropriate route for processing.
The route guides the request to the correct server logic.
The server logic, with the help of Mongoose (active chef), prepares the dish (processes the database operations).
Mongoose interacts with the database (crockery) to perform necessary CRUD operations.
Before sending the dish back, the controller may use services to handle reusable logic or complex business logic, like sending emails, formatting data, or performing additional validation.
Mongoose provides the refined ingredients (processed data) back to the controller, which passes the final results (e.g., a prepared dish) to the server.
After database operations and service processing, the controller may generate a JWT token for secure authentication.
The server sends the completed dish (response) along with the JWT token back to the customer.

 */


const userModel = require('../models/user.model');


module.exports.createUser = async ({firstname, lastname, email, password})=> {
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }

    const user = userModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    })

    return user;
}