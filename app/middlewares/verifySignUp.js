const database = require("../models");
const ROLES = database.ROLES;
const User = database.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) =>{
    if (err) {
      res.status(500).send({message:err})
      return;
    }
    if (user) {
      res.status(400).send({ message: "Användarnamnet finns redan!" });
      return;
  }
  User.findOne({
    email: req.body.email
  }).exec((err, user)=> {
    if(err){
      res.status(500).send({ message: err });
      return;
    }
    if(user){
      res.status(400).send({ message: "Emailadressen finns redan!" });
      return;
    }
    next();
  });
})
}

checkRolesExisted= (req, res, next) => {
  if(req.body.roles) {
    for (let i= 0; i< req.body.roles.length; i++){
      if(!ROLES)
    }
  }
}