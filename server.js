const express = require('express');
const sequelize = require('./config/connection');

const Car = require('./models/Car');
const Customer = require('./models/Customer');
const Reservation = require('./models/Reservation');

const app = express();
const PORT = process.env.PORT || 3001;
// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
