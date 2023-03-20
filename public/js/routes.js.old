const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// set up Handlebars as the view engine

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//create them as async, use tri catch block to catch errors

app.get("/", async (req, res) => {
    try {
        const response = await fetch('/');
        const data = await response.json();
        res.render("main", { data }); // pass the data to the main template
    } catch (error) {
        console.error(error);
        res.render("error"); // render the error template in case of an error
    }
});

app.get("/home", async (req, res) => {
    try {
        const response = await fetch('/home');
        const data = await response.json();
        res.render("home", { data }); // pass the data to the main template
    } catch (error) {
        console.error(error);
        res.render("error"); // render the error template in case of an error
    }
});

app.get("/gallery", async (req, res) => {
    try {
        const response = await fetch('/gallery');
        const data = await response.json();
        res.render("gallery", { data }); // pass the data to the main template
    } catch (error) {
        console.error(error);
        res.render("error"); // render the error template in case of an error
    }
});


app.listen(3001, () => {
    console.log('Server listening on port 3001');
});



