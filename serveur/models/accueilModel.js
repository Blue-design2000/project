const sql = require("../database.js");
const {SHA3}=require("sha3")
// constructor
const hash=new SHA3(512);
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (req, res) => {
  console.log("JE CREE UNE ENTREPRISE")
    const {ConfirmerMdp, ...Infos} = req.body;
  console.log(Infos)
  sql.query("INSERT INTO user SET ?", Infos, (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }

    console.log("created customer: ", { id: response.insertId, ...Infos });
    res.send( { id: response.insertId, ...Infos });
  });
console.log("FINN")
};

Customer.connect = (req, res) => {
  let Infos=req.body
    console.log("findbyid",{...Infos})
  sql.query(`SELECT * FROM user WHERE mail = '${Infos.mail}'`, (err, response) => {
    if (err) {
      console.log("connexion echouée",err);
      res.send(err);
      return;
    }
    console.log(response.length,response[0].mdp,Infos.mdp,response[0].mdp==Infos.mdp)
    if (response.length && response[0].mdp==Infos.mdp){
      console.log("connexion réussie");
      res.send(response[0]);
      return;
    }

    // not found Customer with the id
    res.send("not found");
  });
};
module.exports = Customer;
