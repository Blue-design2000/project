
    const customers = require("../models/accueilModel.js");
    const router = require('express').Router();  
    // Create a new Customer
    router.post("/create", customers.create);
    // Retrieve a single Customer with customerId
    router.post("/connect/entreprise", customers.connectEnreprise);
    router.post("/connect/client", customers.connectClient);
    
    router.get("/", (req, res) => {
        res.json({ message: "Welcome to kalash application." });
      });
      
    module.exports = router;