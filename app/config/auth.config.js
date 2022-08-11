const dotenv = require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  secret : SECRET_KEY
}