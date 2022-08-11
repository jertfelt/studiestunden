const db = require("../models");
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.usernameLogin
  }).exec((err,user) =>{
    if (err) {
      res.status(500).send({message: err});
      return;
    }
    if(user){
      res.status(400).send({message: "Emailen finns redan. Har du glömt lösenord?"})
      return;
    }
    next();
  })
}
const verifySignUp = {
  checkDuplicateUsernameOrEmail
}
module.exports = verifySignUp;