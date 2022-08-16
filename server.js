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
// require('./app/routes/auth.routes')(app);
require("./app/routes/user.routes")(app);

//*-----------Post actions




//?---------- 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

