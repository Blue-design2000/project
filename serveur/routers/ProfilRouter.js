
    
    const customers = require("../models/commandeModel.js");
    const router = require('express').Router();  
    // Create a new Customer
    router.post("/customers", customers.create);
    // Retrieve a single Customer with customerId
    router.get("/customers/:customerId", customers.findById);
    module.exports = router;