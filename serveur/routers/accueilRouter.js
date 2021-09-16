
    const customers = require("../models/accueilModel.js");
    const router = require('express').Router();  
    // Create a new Customer
    router.post("/create", customers.create);
    // Retrieve a single Customer with customerId
    router.post("/connect", customers.connect);
    router.get("/", (req, res) => {
        res.json({ message: "Welcome to kalash application." });
      });
      
    module.exports = router;