const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  lastName: String,
  favorites: []
});

const User = mongoose.model("users", userSchema);

module.exports = { User };