import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  type: String,
  username: String,
  password: String
});

constUserr = mongoose.models.User || mongoose.model("User", userSchema);

export default User;