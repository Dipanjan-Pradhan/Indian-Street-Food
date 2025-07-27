const mongoose = require('./db');

const userSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  type: String,
  username: String,
  password: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;