const sql = require("../database.js");

// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (req, res) => {
  sql.query("INSERT INTO user SET ?", req.query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, data: req.params });
    result(null, { id: res.insertId, data: req.params });
  });
};

Customer.findById = (req, res) => {
  sql.query(`SELECT * FROM user WHERE mail = ${req.params.customerId}`, (err, response) => {
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
