const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  telId: {
    type: Number,
    required: true,
  },
  status:{
    type:Boolean
  }
},{timestamps:true});

const User = mongoose.model("User", userSchema);

module.exports = User;
