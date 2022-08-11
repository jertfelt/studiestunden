const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
  user.save((err,user) => {
    if(err){
      res.status(500).send({message:err})
      return;
    }
   res.send(console.log("User was registrered successfully"));
  }) 
}
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.usernameLogin,
  })
  .populate("-__v")
  .exec((err, user) => {
    if(err){
      res.status(500).send({message: err});
      return;
    }
    if(!user){
      return res.status(404).send({ message: "User Not found." });
    }
    let passwordIsValid = bcrypt.compareSync(
      req.body.passwordLogin,
      user.password
    );
    if(!passwordIsValid){
      return res.status(401).send({ message: "Invalid Password!" });
    }
    let token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: 86400
    });
    req.session.token = token;
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
    })
  })
}

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({message: "signed out"});
  }
  catch(err){
    this.next(err)
  }
}