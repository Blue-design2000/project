const sql = require("../database.js");
const md5=require("md5")
// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (req, res) => {
  if(Infos.Motdepasse != Infos.ConfirmerMDP){
    setErreur((erreur)=>erreur+"le mot de passe ne correspond pas à la confirmation"); a+=1}
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(Infos.Email)){a+=1}
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(Infos.Motdepasse)){a+=1}
    if(Infos.Nom_dentreprise.length<1){a+=1}
    if(Infos.SIRET.length<1){a+=1}
  if (a==0){
  sql.query("INSERT INTO user SET ?", req.query, (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }

    console.log("created customer: ", { id: response.insertId, ...req.query });
    res.send( { id: response.insertId, ...req.query });
  });
}
};

Customer.connect = (req, res) => {
    console.log("findbyid",{...req.query})
  sql.query(`SELECT * FROM user WHERE mail = ${req.query.mail}`, (err, response) => {
    if (err) {
      console.log("connexion echouée");
      res.send(err);
      return;
    }

    if (response.length && response[0].mdp==md5(req.query.mdp)){
      console.log("connexion réussie");
      res.send(response[0]);
      return;
    }

    // not found Customer with the id
    res.send("not found");
  });
};
module.exports = Customer;
