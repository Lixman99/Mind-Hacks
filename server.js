const express = require('express');
//const sequelize = require('./config/connection');
const path = require("path")
const exphbs = require("express-handlebars")
// const Car = require('./models/Car');
// const Customer = require('./models/Customer');
// const Reservation = require('./models/Reservation');
const app = express();
//const hbs = exphbs.create({helper}) only need for helpers

//app.engine("handlebars", hbs.engine)

app.set("view engine", "handlebars")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




const PORT = process.env.PORT || 3001;
// Connect to the database before starting the Express.js server

app.get("/", (req, res) => {
  res.render("main")
})

app.get("/gallery", (req, res) => {
  res.render("gallery")
})

app.get("/home", (req, res) => {
  res.render("home")
})

app.get("/rent", (req, res) => {
  res.render("rent")
})




//sequelize.sync().then(() => {
app.listen(PORT, () => console.log('Now listening'));
//});


//----HandleBar Set Up-



//routes must be in controllers folder --



