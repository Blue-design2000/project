/* eslint-disable no-console */
const port = 3000;
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors")
const WebSocket = require('ws');
const app = express();
const accueilRouter = require('./routers/accueilRouter');
const menuRouter = require('./routers/menuRouter');
const profilRouter = require('./routers/profilRouter');
const commandeRouter = require('./routers/commandeRouter');

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

const socket = new WebSocket.Server({ server });
console.log(socket)

app.get("/", (req, res) => {
    console.log("coucou")
    res.send({ message: "Welcome to bezkoder application." });
  });
  
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
module.exports = app;