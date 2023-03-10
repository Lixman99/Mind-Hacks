const express = require('express');
const sequelize = require('./config/connection');
const path = require("path")
const exphbs = require("express-handlebars")


const path = require("path")
const express = require("express")
const exphbs = require("express-handlebars")
const hbs = exphbs.create()

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/home", (req, res) => {
    res.render("homepage")
})

app.get("/galery", (req, res) => {

})

app.get("/rent", (req, res) => {
    res.render("contact")
})


const Car = require('./models/Car');
const Customer = require('./models/Customer');
const Reservation = require('./models/Reservation');


const app = express();
const PORT = process.env.PORT || 3001;
// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


//----HandleBar Set Up--


const hbs = exphbs.create() //if we have helpers, add them within create()


app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//routes must be in controllers folder --

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

app.listen(3001, () => {
  console.log("app listening")
})