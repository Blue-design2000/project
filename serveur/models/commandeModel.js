const sql = require("../database.js");
const WebSocket = require('ws');
const http = require('http');
const wss = new WebSocket.Server({ server });

// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (req, res) => {
  sql.query("INSERT INTO commande SET ?", req.query, (err, res) => {// un insere un nouvel element
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    sql.query("SELECT * FROM commande", req.query, (err2, res2) => {// on dit a tout le monde qu'on l'a insere 
      if (err) {
        console.log("error: ", err2);
        result(err, null);
        return;
      }
      ws.send(res2.data);//on envoie toute la table mise a jour 

    console.log("created customer: ", { id: res.insertId, data: req.params });
    result(null, { id: res.insertId, data: req.params });
  });
});
};

Customer.findById = (req, res) => {
  sql.query(`SELECT * FROM user WHERE mail = ${req.params.customerId}`, (err, response) => {
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            //changement de colonne .query .send? 
        });
        ws.send('something from server');
    });
    
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
