const mongoodb = require("mongoose");

const userSchema = new mongoodb.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = mongoodb.model("User", userSchema);
module.exports = User;
