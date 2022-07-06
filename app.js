const express = require('express');
const dotenv = require("dotenv").config();
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");

const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const port = process.env.PORT;

const dbURI = "mongodb+srv://"+USER+":"+PASS+"@studiestunden.v4y2zyx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedToPology: true})
.then((result) => {app.listen(port)
  console.log("connected")}
)
.catch((error) => console.log("-------ERROR CONNECTING " + error))


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));


app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});


app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Start'});
});

app.get("/registrera", (req, res) => {
  res.render("../views/userInterface/createUser.ejs",{ title: "Registrera dig"})
})

app.get("/login", (req, res) => {
  res.render("../views/userInterface/login.ejs",{ title: "Logga in"})
})

app.get("/detaljer", (req, res) => {
  res.render("../views/userInterface/details.ejs",{ title: "Dina detaljer"})
})

app.get("/taskboard", (req, res) => {
  res.render("../views/taskboard/taskboard.ejs",{ title: "Din anslagstavla"})
})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
