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
const db = require ("./app/models");
const Role = db.role;

const dbURI = "mongodb+srv://"+USER+":"+PASS+"@studiestunden.v4y2zyx.mongodb.net/studiestunden?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedToPology: true})
.then((result) => {app.listen(port)
  console.log(`connected to MongoDB, server is running on ${port}`)
  //function that creates roles:
  const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0){
        new Role({
          name: "user"
        }).save(err => {
          if (err){
            console.log("ERROR", err);
          }
          console.log("Added 'user' to roles")
        })
        new Role({
          name: "admin"
        }).save(err => {
          if(err) {
            console.log("ERROR", err)
          }
          console.log("Added 'Admin'");
        })
      }
    })
  }
  initial();
}
)
.catch(error => {console.log("-------ERROR CONNECTING " + error)
process.exit();
});


// // //?-------HOMEPAGE(OLD)
// app.get('/', (req, res) => {
//   res.render('index', { title: 'Studiestunden'});
// });





// //*-----------ROUTES
// //*! Av någon anledning fungerar inte nedan:
require('./app/routes/auth.routes')(app);
require("./app/routes/user.routes")(app);

// //?-------HOMEPAGE(OLD)
app.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, Content-Type, Accept",
  )
  res.render('index', { title: 'Studiestunden'});
});


//?---------- 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

