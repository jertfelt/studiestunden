const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  // img: {
  //   data: Buffer,
  //   contentType: String,
  // },
}, 
{timestamps: true}
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;