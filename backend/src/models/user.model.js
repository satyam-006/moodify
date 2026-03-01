const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username is already exits"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
