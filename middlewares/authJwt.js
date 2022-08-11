const jwt = require("jsonwebtoken");
const config =require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const SECRET = process.env.SECRET;

verifyToken = (req, res, next) => {
  let token = req.session.token;
  if (!token){
    return res.status(403).send({message: "Finns ingen token"})
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({message: "Unauthorized"})
    }
    req.userId = decoded.id;
    next();
  })
}

const authJwt = {
  verifyToken
}

module.exports = authJwt;