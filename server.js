const express = require('express');
const sequelize = require('./config/connection');


const path = require("path")
const exphbs = require("express-handlebars")
const hbs = exphbs.create()
const app = express()

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

// app.get("/home", (req, res) => {
//     res.render("homepage")
// })


// app.get("/gallery", (req, res) => {

// })

// app.get("/rent", (req, res) => {
//     res.render("contact")
// })




app.use(require("./controllers"));


const PORT = process.env.PORT || 3001;
// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});