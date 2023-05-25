const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter your number!"],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
