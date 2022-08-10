//**Installations */
const express = require('express');
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config();
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");
const Users = require("./models/users");
const morgan = require("morgan");
const { response } = require('express');
const bcrypt = require('bcrypt');
const session = require("express-session");

// register view engine
app.set('view engine', 'ejs');

//parsing data
app.use(express.json())
app.use(express.urlencoded({extended:true}));
//cookies middleware:
app.use(cookieParser());

// public file
app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//*---dotenv:
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const port = process.env.PORT;

//session cookie
app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: "secret",
  cookie: {
    maxAge: 8*60*60*1000
  }
}));

const saltRounds = 10;

//**-------Mongoose connection:--------*/

const dbURI = "mongodb+srv://"+USER+":"+PASS+"@studiestunden.v4y2zyx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedToPology: true})
.then((result) => {app.listen(port)
  console.log("connected to database")}
)
.catch((error) => console.log("-------ERROR CONNECTING " + error))


//**-----------------ROUTES----------  */

// //?-------HOMEPAGE(OLD)
app.get('/', (req, res) => {
  res.render('index', { title: 'Studiestunden'});
});

app.get('/start', (req, res) => {
  res.render('index', { title: 'Studiestunden'});
});


app.post("/users", async (req, res) => {
  // const hash = await bcrypt.hash(req.body.pass, saltRounds);  
  // console.log(req.body)
  const user = new Users(req.body);
  await user.save()
  .then((result) => {
    console.log("resultatet är här: " + result);
    res.json({
      success:true
    })
  })
  .catch((err) => {
    console.log(err)
  })
})


app.get("/medlem/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id).then(result =>{
    console.log(result)
    res.render("../views/userInterface/details", {user: result, title: "Din info"})
  }).catch(error => {
    console.log(error)
  })

})

//?---------REGISTER
app.get("/registrera", (req, res) => {
  res.render("../views/userInterface/createUser",{ title: "Registrera dig!"})
})



//?---------LOGGED IN DETAILS
app.get("/detaljer", (req, res) => {
  const id = req.params.id;
 
  // User.findById(id).then(result => {
  //   console.log(result);
  // //   res.render("../views/userInterface/details.ejs", 
  // //   {medlem: result, title: "Dina detaljer"})
  // // }).catch(err => {
  // //   console.log(err)
  // // })
  // })
})

//?---------LOGIN
app.get("/login", (req, res) => {
  res.render("../views/userInterface/login.ejs",{ title: "Logga in"})
})

//?---------LOGGED IN TASKBOARD
app.get("/taskboard", (req, res) => {
  res.render("../views/taskboard/taskboard.ejs",{ title: "Din anslagstavla"})
})


//?---------- 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

