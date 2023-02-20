const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    require: [true, 'first enter your name'],
    type: String,
    unique: false,
  },
  email: {
    require: [true, 'email is requried'],
    type: String,
    unique: [true, 'Email exist already'],
  },
  password: {
    require: [true, 'must enter your password'],
    type: String,
    unique: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports.User = User;
