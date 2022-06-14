const express = require("express");
const app = express();


//*-----------middleware och statiska filer
//1. access till css & bilder
app.use(express.static("public"));
//2. för form data 
app.use(express.urlencoded({extended: true}))
//3. formula för next och response/requests så programmet inte bara fastnar på första funktionen
app.use((request, response, next) =>{
  response.locals.path = request.path;
  next();
})
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//--------startsida:
app.get("/", (request, response) => {
  response.render("index", {title: "StudieStunden"});
})





app.listen(3000);