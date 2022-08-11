//**Installations */
const express = require('express');
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config();
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");
const Users = require("./models/users");
const { response } = require('express');
const bcrypt = require('bcrypt');
const path = require("path");
const cors= require("cors");
const cookieSession = require("cookie-session");

let corsOptions = {
  origin: "http://localhost:3000"
}
app.use(cors(corsOptions));

//*---dotenv:
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const port = process.env.PORT;
const SECRET = process.env.SECRET;

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

app.use(
  cookieSession({
    name: "cookie",
    secret: SECRET,
    httpOnly: true
  })
)

//**-------Mongoose connection:--------*/

const dbURI = "mongodb+srv://"+USER+":"+PASS+"@studiestunden.v4y2zyx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedToPology: true})
.then((result) => {app.listen(port)
  console.log("connected to database")}
)
.catch((error) => console.log("-------ERROR CONNECTING " + error))



// // routes
// const authRoutes = require('./routes/auth.routes')
// const userRoutes = require('./routes/user.routes')




//**-----------------ROUTES (GET) */

// //?-------HOMEPAGE(OLD)
app.get('/', (req, res) => {
  res.render('index', { title: 'Studiestunden'});
});

//!temporary route to "start"
app.get('/start', (req, res) => {
  res.render('index', { title: 'Studiestunden'});
});


//?---------LOGIN
app.get("/login", (req, res) => {
  res.render("../views/userInterface/login.ejs",{ title: "Logga in"})
})


//?---------REGISTER
app.get("/registrera", (req, res) => {
  res.render("../views/userInterface/createUser",{ title: "Registrera dig!"})
})


///*----------------POST ROUTES----------------------

//*----Register functionality
app.post("api/auth/register", async (req, res) => {
  // const hash = await bcrypt.hash(req.body.pass, saltRounds);  
  // console.log(req.body)
  const user = new Users(req.body);
  await user.save()
  .then((result) => {
    console.log("resultatet är här: " + result);
  })
  .catch((err) => {
    console.log(err)
  })
  res.json({
    success_token: true,
    user
  })
})


//*------Login functionality

app.post("/api/auth/login", (req, res) => {
 
})

//Sign out
app.post("/api/auth/signout", (req, res) => {})

//access user content
app.get("/api/user", (req, res) => {

})

//change user details
app.post("/api/user", (req, res) => {

})

// edit/post taskboard
app.post("/api/user/taskboard", (req, res) => {

})

//access taskboard
app.get("/api/user/taskboard", (req, res) => {})

// app.post("/login", async (req, res) => {
//   const user = await Users.findOne({user: req.body.usernameLogin});
//   console.log(req.body);
//   if (!match){
//     res.status(401).json({error: "wrong password"})
//   }
//   else {
//     req.session.user = user;
//     res.json({
//       user: user.user
//     })
//   }
// })

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



app.get("/medlem/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id).then(result =>{
    console.log(result)
    res.render("../views/userInterface/details", {user: result, title: "Din info"})
  }).catch(error => {
    console.log(error)
    res.status(404)
		res.send({ error: "Användaren finns inte!" })
  })

})



//?---------LOGGED IN TASKBOARD
app.get("/taskboard", (req, res) => {
  res.render("../views/taskboard/taskboard.ejs",{ title: "Din anslagstavla"})
})


// app.get("loggedin", (req, res) => {
//   console.log(req.session.user)
//   if(req.session.user){
//     res.json({ user: req.session.user});
//   }
//   else{
//     res.status(404).render("404", {title: "404"})
//   }
// })


//?---------- 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

