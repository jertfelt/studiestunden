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
  img: {
    data: Buffer,
    contentType: String,
  },
  email:{
    type: String,
    required: true
  }
}, 
{timestamps: true}
);

const User = mongoose.model("User", userSchema);
module.exports = User;