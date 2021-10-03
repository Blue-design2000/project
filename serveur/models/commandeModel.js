const sql = require("../database.js");

// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};




Customer.create = (req, result) => {
  sql.query("INSERT INTO commande SET ?", req.query, (err, res) => {// un insere un nouvel element
    if (err) {
      console.log("error: ", err);
      res.send(err);
      return;
    }
    sql.query("SELECT * FROM commande", req.query, (err2, res2) => {// on dit a tout le monde qu'on l'a insere 
      if (err) {
        console.log("error: ", err2);
        result.send(err);
        return;
      }
      
    console.log("created customer: ", { id: res.insertId, data: req.params });
    result(null, { id: res.insertId, data: req.params });
  });
});
};

Customer.findById = (req, res) => {
  sql.query(`SELECT * FROM commande WHERE mail = ${req.params.customerId}`, (err, response) => {
    
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }

    if (response.length) {
      console.log("found customer: ", response[0]);
      res.send(response[0]);
      return;
    }

    // not found Customer with the id
    res.send("not found");
  });
};

module.exports = Customer;
