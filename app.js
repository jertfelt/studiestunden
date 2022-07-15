//**Installations */
const sessions = require("express-session")
const express = require('express');
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config();
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");
const Users = require("./models/users");
const morgan = require("morgan");



// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//**-------mongoose connection:--------*/
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASSWORD;
const port = process.env.PORT;
const SECRET = process.env.SECRET;

const dbURI = "mongodb+srv://"+USER+":"+PASS+"@studiestunden.v4y2zyx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedToPology: true})
.then((result) => {app.listen(port)
  console.log("connected to database")}
)
.catch((error) => console.log("-------ERROR CONNECTING " + error))

//**--------Express session */
const dayTime = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: SECRET,
  saveUninitialized: true,
  cookie: { 
    maxAge: dayTime,},
  resave: false
}))

app.use(cookieParser);

const myusername = 'user1'
const mypassword = 'mypassword'
let session;

//**-----------------ROUTES----------  */

//?-------HOMEPAGE
app.get('/', (req, res) => {
  res.render('index', { title: 'Studiestunden'});
});



app.post("/users", (req, res) => {  
  // console.log(req.body)
  const user = new Users(req.body);
  user.save()
  .then((result) => {
    console.log("resultatet är här: " + result)
    res.redirect("/");
    sessionStorage.setItem('status','loggedIn') 
  })
  .catch((err) => {
    console.log(err)
  })
})

app.post("/users", (req, res) => {
  if(req.body.usernameLogin == myusername){
    session = req.session;
    session.userid=req.body.usernameLogin;
        console.log(req.session)
  }
})


app.get("/medlem/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id).then(result =>{
    console.log(result)
    res.render("../views/userInterface/details", {user: result, title: "Din info"})
  }).catch(error => {
    console.log(error)
  })


  // User.find().then(result =>{
  //   console.log("THIS IS ALL THE RESULTS:" + result)
  //   res.render("../views/partials/test"), {user: result, title: "Alla medlemmar"}
  // })
  // .catch(err => 
  //   console.log(err)
  // )
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
  res.render("../views/userInterface/login.ejs",{ title: "Logga in"}).catch(error => {
    console.log(error)
})})

//?---------LOGGED IN TASKBOARD
app.get("/taskboard", (req, res) => {
  res.render("../views/taskboard/taskboard.ejs",{ title: "Din anslagstavla"})
})


//?---------- 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});



//***upload profile pic (in development)
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}));


// const storage = multer.diskStorage({destination: function(req, fule,cb){ cb(null, "uploads")},
// filename: function(req, file,cb){cb(null, file.fieldname + "-" + Date.now())}
// })

// const uploadimg = multer({storage: storage});


// app.post("/users-register", uploadimg.single("Profile"),(req, res) => {

//   //profilepic
//   let profileimg = fs.readFileSync(req.file.path);
//   let encodedImg = profileimg.toString("base64");
//   let finalImg = {
//       contentType: req.file.mimetype,
//       image: new Buffer(encodedImg, "base64")
//   }

//   const newUser = new User(request.body, finalImg, function (err,result){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(result.profileimg.Buffer);
//       console.log("Saved to database");
//       res.contentType(finalImg.contentType);
//       res.send(finalImg.image);
//     } 
//   })
//   newUser.save().then(() => {
//     res.redirect("/");
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   //   //usual suspects:
//   // User.create(finalImg, function (err,result){
//   //   if(err){
//   //     console.log(err);
//   //   }else{
//   //     console.log(result.profileimg.Buffer);
//   //     console.log("Saved to database");
//   //     res.contentType(finalImg.contentType);
//   //     res.send(finalImg.image);
//   //   }
//   // })
// })



