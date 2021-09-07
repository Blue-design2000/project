/* eslint-disable no-console */
const port = 8000;
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const accueilRouter = require('./routers/accueilRouter');
const menuRouter = require('./routers/menuRouter');
const profilRouter = require('./routers/profilRouter');
const commandeRouter = require('./routers/commandeRouter');
app.use('/accueil', accueilRouter);
app.use('/menu', menuRouter);
app.use('/profil', profilRouter);
app.use('/commande', commandeRouter);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
module.exports = app;