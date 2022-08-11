const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const mongoose = require("mongoose")
const _ = require("lodash");
const { initial } = require("lodash");
const dotenv = require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000"
};
const db = require ("./app/models");
const Role = db.role;

//*---------DOTENV:
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const port = process.env.PORT;
const SECRET = process.env.SECRET;

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

app.set('view engine', 'ejs');

// public file
app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


//function that creates roles:


//**-------Mongoose connection:--------*/

const dbURI = "mongodb+srv://"+USER+":"+PASS+"@studiestunden.v4y2zyx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedToPology: true})
.then((result) => {app.listen(port)
  console.log(`connected to MongoDB, server is running on ${port}`)
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



app.get("/", (req,res) => {
  res.json({message: "Welcome to the world of tomorrow"})
})




//?---------- 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

