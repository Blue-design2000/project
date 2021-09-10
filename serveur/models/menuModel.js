const sql = require("../database.js");

// constructor
const Menu = function(menu) {
  this.email = menu.email;
  this.name = menu.name;
  this.active = menu.active;
};

Menu.create = (req, res) => {
  sql.query("INSERT INTO menu SET ?", req.query, (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }

    console.log("created menu: ", { id: response.insertId, ...response.query });
    res.send({ id: response.insertId,data: req.query });
  });
};
Menu.desactivate = (req, res) => {
  sql.query("UPDATE menu set actif=0 where id= ?", req.query.id, (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }

    console.log("desactivate: ", { id: response.insertId, ...response.query });
    res.send({ id: response.insertId,data: req.query });
  });
};
Menu.delete = (req, res) => {
  sql.query("DELETE FROM menu where id= "+req.query.id+" or parentId="+req.query.id,  (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }

    console.log("desactivate: ", { id: response.insertId, ...response.query });
    res.send({ id: response.insertId,data: req.query });
  });
};
Menu.activate = (req, res) => {
  sql.query("UPDATE menu set actif=1 where id= ?", req.query.id, (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }

    console.log("activate: ", { id: response.insertId, ...response.query });
    res.send({ id: response.insertId,data: req.query });
  });
};

Menu.findById = (req, res) => {
  sql.query(`SELECT * FROM menu WHERE actif=1 and userID = ${req.params.userID}`, (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }
    if (response.length) {
      console.log("found menu: ");
      menu=arbre(response)
      res.send(menu);
      return;
    }

    // not found Menu with the id
    res.send("not found");
  });
};
let arbre=(table)=>{
  let noms=["root","menu","categorie","produit"]
  let tri=[[],[],[],[]]
  console.log(tri)
  places={}
  for(const menu of table){// je trie par categorie
    tri[noms.indexOf(menu.type)].push(menu)
  }
  tri[0]=tri[0].concat(tri[1],tri[2],tri[3])
  table=tri[0].map((el)=>{el.children=[];return el})
  let root=table.find((el)=>el.type="root")
  table=table.filter((el)=>el.type!="root");
  console.log(root)
  root.parentId=null
  var node_list = {};
  node_list[root.id]=root
  for (var i = 0; i < table.length; i++) {
      node_list[table[i].id] = table[i];
      console.log(places,"coucou",node_list,"fin",table[i])
      node_list[table[i].parentId].children.push(node_list[table[i].id]);
  }
  return node_list[root.id]
}
    
module.exports = Menu;
