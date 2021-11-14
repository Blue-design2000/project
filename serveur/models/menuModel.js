const sql = require("../database.js");

// constructor
const Menu = function(menu) {
  this.email = menu.email;
  this.name = menu.name;
  this.active = menu.active;
};

Menu.create = (req, res) => {
  console.log(req)
  sql.query("INSERT INTO menu SET ?", req.body, (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }

    console.log("created menu: ", { id: response.insertId, ...response.query });
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
  console.log(req.body.actif,`UPDATE menu set actif='${+!req.body.actif}' where id= '${req.body.id}'`)
  sql.query(`UPDATE menu set actif='${+!req.body.actif}' where id= '${req.body.id}'`,  (err, response) => {
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
  console.log("FINDBYID",req.params)
  sql.query(`SELECT * FROM menu WHERE mail = '${req.params.mail}'`, (err, response) => {
    if (err) {
      console.log("error: ", err);
      res.send(err, null);
      return;
    }
    if (response.length) {
      let picker=[]
      response.forEach((x)=>picker.push([x.id,x.name]))
      console.log("found menu: ",response,picker);
      let menu=arbre(response)
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
  places={}
  let list=[]
  for(const menu of table){// je trie par categorie
    tri[noms.indexOf(menu.type)].push(menu)
    list.push([menu.id,menu.name])
  }
  tri[0]=tri[0].concat(tri[1],tri[2],tri[3])
  table=tri[0].map((el)=>{el.children=[];return el})
  let root=table.find((el)=>el.type="root")
  table=table.filter((el)=>el.type!="root");
  root.parentId=null
  var node_list = {};
  node_list[root.id]=root
  for (var i = 0; i < table.length; i++) {
      node_list[table[i].id] = table[i];
      console.log(node_list,table[i].parentId)
      if(node_list[table[i].parentId]!==undefined){node_list[table[i].parentId].children.push(node_list[table[i].id]);}
  }

  return {tree: node_list[root.id],list:list}
}
    
module.exports = Menu;
