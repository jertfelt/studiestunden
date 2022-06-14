const express = require("express");
const app = express();


const mongoose = require ("mongoose");
const dbURI = "mongodb+srv://test:test@bowling.fjtiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true})
.catch(error => console.log(error));
//*-----------middleware och statiska filer
// access till css & bilder
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
//formula för next och response/requests så programmet inte bara fastnar på första funktionen
app.use((request, response, next) =>{
  response.locals.path = request.path;
  next();
})

app.set("view engine", "ejs");

//--------startsida:
app.get("/", (request, response) => {
  response.render("index", {title: "StudieStunden"});
})


app.listen(3000);