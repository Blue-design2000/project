const port = 3000;
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
const WebSocket = require('ws');
const accueilRouter = require('./routers/accueilRouter');
const menuRouter = require('./routers/menuRouter');
const profilRouter = require('./routers/profilRouter');
const commandeRouter = require('./routers/commandeRouter');
const sql = require("./database.js");
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let id={}
function uniqueID() {
  return Math.floor(Math.random() * Date.now())
  }
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let clairMessage= message.toString()
    console.log(clairMessage)
    if(clairMessage.nature=="init"){// si c'est le message de connexion on enregistre le restaurant 
      id[clairMessage.uid].append(clairmessage.idrest)
    }else if(clairMessage.nature=="etat"){// si il envoie pour changer l'etat on envoie a tous les gens du restau et on change dans la BDD 
      let filtered = Object.fromEntries(Object.entries(id).filter(([k,v]) => v[1]==clairMessage.idrest));// on prend tous les gens qui ont le meme id que l'envoyeur
      Object.keys(filtered).forEach((x)=>id[x][0].send(JSON.toString({nature:"etat",id: clairMessage.id,etat:changeState[+1==clairMessage.etat]+1})))// on envoie le changement a tout le monde
      let changeState=["+","-"]
      sql.query("UPDATE commandes SET state=state"+changeState[+1==clairMessage.etat]+"1 WHERE idrest='"+clairMessage.idrest+"'",(err, res) => {
        if (err) {
        console.log("error: ", err);
        res.send(err);
        return;
      }})
    }else if (clairMessage.nature=="add"){// si c'est pour enregistrer un nouveau menu on envoie a tout le monde et dans la bdd 
      let filtered = Object.fromEntries(Object.entries(id).filter(([k,v]) => v[1]==clairMessage.idrest));
      Object.keys(filtered).forEach((x)=>id[x][0].send(JSON.toString({nature:"add",string:clairMessage.string})))
      sql.query("INSERT INTO commandes SET ?",clairMessage.data,(err, res) => {
        if (err) {
        console.log("error: ", err);
        res.send(err);
        return;
      }})
    }
    console.log(message.toString())// J ARRIVE PAS A AVOIR ACCES AUX DONNEES 
  });
  let uid=uniqueID()
  id[uid]=[ws]
  ws.send("{\"nature\":\"init\",\"id\":"+uid+"}");
});
server.listen(port, function(err) {
  if (err) {
      throw err;
  }
  console.log(`listening on port ${port}!`);
});
// parse requests of content-type: application/json
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/accueil', accueilRouter);
app.use('/menu', menuRouter);
app.use('/profil', profilRouter);
app.use('/commande', commandeRouter);

app.listen(8080, function(err) {
  if (err) {
    throw err;
  }
  console.log(`listening on port ${port}!`);
});
app.get("/", (req, res) => {
    console.log("coucou")
    res.send({ message: "Welcome to bezkoder application." });
  });
module.exports = app;
