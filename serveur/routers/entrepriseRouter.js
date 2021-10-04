
    
    const customers = require("../models/entrepriseModel.js");
    const router = require('express').Router();  
    // Create a new Customer
    router.post("/entreprise/findbyId", customers.create);
    // Retrieve a single Customer with customerId
    router.get("/customers/:customerId", customers.findById);
    module.exports = router;