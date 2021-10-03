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

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {  
    console.log(JSON.stringify(message))// J ARRIVE PAS A AVOIR ACCES AUX DONNEES 
  });
  ws.send('something from server');
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
