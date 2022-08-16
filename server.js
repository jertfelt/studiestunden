const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000"
};

//*---------DOTENV:
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const port = process.env.PORT;
const SECRET = process.env.SECRET;

//*-------EXPRESS
const app = express();
app.set('view engine', 'ejs');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cookieSession({
    name: "cookie",
    secret: SECRET,
    httpOnly: true
  })
)
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// public file
app.use(express.static('public'));

//**-------Mongoose connection:--------*/
const dbURI = "mongodb+srv://"+USER+":"+PASS+"@studiestunden.v4y2zyx.mongodb.net/studiestunden?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedToPology: true})
.then((result) => {app.listen(port)
  console.log(`connected to MongoDB, server is running on ${port}`)
}
)
.catch(error => {console.log("-------ERROR CONNECTING " + error)
process.exit();
});

// //*-----------ROUTES
require('./app/routes/auth.routes')(app);
require("./app/routes/user.routes")(app);


// const controller = require("./app/controllers/user.controller");
// const { authJwt } = require("./app/middlewares");
// const { verifySignUp } = require("./app/middlewares");

// app.post("/users", (req, res) => {
//   res.setHeader("Access-Control-Allow-Headers",
//   "Origin, Content-Type, Accept",
//   )
//   verifySignUp.checkDuplicateUsernameOrEmail,
//   controller.signup,
//   controller.signin
//   res.render("../views/userInterface/details",{ title: "Din profil"})
// })

//?---------- 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});




//*-----------Post actions

// const controller = require("./app/controllers/auth.controller");
// const database = require("./app/models");
// const User = database.user;

// const checkDuplicateUser = (req, res, next) => {
//   User.findOne({
//     username: req.body.username
//   }).exec((err, user) => {
//     if(err){
//       res.status(500)
//       console.log(err)
//       return;
//     }
//     if(user){
//       res.status(400)
//       console.log("Användarnamnet finns redan!");
//       return;
//     }
//     User.findOne({
//       email: req.body.email
//     }).exec((err, user)=> {
//       if(err){
//         res.status(500).send({ message: err });
//         return;
//       }
//       if(user){
//         res.status(400).send({ message: "Emailadressen finns redan!" });
//         return;
//       }
//       next();
//   })
// })}


// app.post("/users", async (req, res, next) => {
//   const user = new User(req.body);
//   checkDuplicateUser();
//   await user.save()
//   .then((result) => {
//     console.log("resultatet är här: " + result);
//   })
  
//   res.header( "Access-Control-Allow-Headers",
//   "Origin, Content-Type, Accept")
//   controller.signup
//   controller.signin
// })
