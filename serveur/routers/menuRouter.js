
    
    const Menu = require("../models/menuModel.js");
    const router = require('express').Router();  
    // Create a new Customer
    router.get("/add", Menu.create);
    // Retrieve a single Customer with customerId
    router.get("/get/:mail", Menu.findById);
    router.post("/activate", Menu.activate);
    router.post("/delete", Menu.delete);
    
    module.exports = router;