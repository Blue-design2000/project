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
let socket={}
idrest={}
function uniqueID() {
  return Math.floor(Math.random() * Date.now())
  }
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let clairMessage= JSON.parse(message.toString());
    console.log("clairmessage",clairMessage)
    if(clairMessage.nature=="init"){// si c'est le message de connexion on enregistre le restaurant 
      sql.query('SELECT * FROM commande WHERE idrest=\''+clairMessage.idrest+'\' and state<3 and state>-1',(err, res)=> {
        console.log("data",res)
      ws.send(JSON.stringify({nature:"data",commandes:res}))})
      idrest[clairMessage.uid]=clairMessage.idrest
    }else if(clairMessage.nature=="etat"){// si il envoie pour changer l'etat on envoie a tous les gens du restau et on change dans la BDD 
      let filtered = Object.fromEntries(Object.entries(idrest).filter(([k,v]) => v[1]==clairMessage.id));// on prend tous les gens qui ont le meme id que l'envoyeur
      Object.keys(filtered).forEach((x)=>idrest[x][0].send(JSON.toString({nature:"etat",id: clairMessage.idrest,etat:changeState[+1==clairMessage.etat]+1})))// on envoie le changement a tout le monde
      let changeState=["-","+"]
      console.log("UPDATE commande SET state=state"+changeState[+(1==clairMessage.etat)]+"1 WHERE id='"+clairMessage.id+"'")
      sql.query("UPDATE commande SET state=state"+changeState[+(1==clairMessage.etat)]+"1 WHERE id='"+clairMessage.id+"'",(err, res) => {
        if (err) {
        console.log("error: ", err);
        res.send(err);
        return;
      }})
    }else if (clairMessage.nature=="add"){// si c'est pour enregistrer un nouveau menu on envoie a tout le monde et dans la bdd 
      let filtered = Object.fromEntries(Object.entries(idrest).filter(([k,v]) => v==clairMessage.idrest));
      Object.keys(filtered).forEach((x)=>socket[x].send(JSON.toString({nature:"add",string:clairMessage.string})))
      sql.query("INSERT INTO commande SET ?",{idclient:clairMessage.idclient,string:clairMessage.string,idrest:clairMessage.idrest},(err, res) => {
        if (err) {
        console.log("error: ", err);
        res.send(err);
        return;
      }})
    }
    console.log(message.toString())// J ARRIVE PAS A AVOIR ACCES AUX DONNEES 
  });
  let uid=uniqueID()
  socket[uid]=ws
  console.log(Object.keys(socket))
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
