
    
    const customers = require("../models/menuModel.js");
    const router = require('express').Router();  
    // Create a new Customer
    router.get("/add", customers.create);
    // Retrieve a single Customer with customerId
    router.get("/get/:userID", customers.findById);
    module.exports = router;