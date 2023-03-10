const express = require('express');
const sequelize = require('./config/connection');

const path = require("path")
const exphbs = require("express-handlebars")
const hbs = exphbs.create()
const app = express()

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/home", (req, res) => {
    res.render("homepage")
})

app.get("/gallery", (req, res) => {

})

app.get("/rent", (req, res) => {
    res.render("contact")
})


const Car = require('./models/Car');
const Customer = require('./models/Customer');
const Reservation = require('./models/Reservation');


;
const PORT = process.env.PORT || 3001;
// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
