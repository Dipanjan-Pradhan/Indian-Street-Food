const mongoose = require('./db');

const venderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: String,
  food: [String],
  stallname: String,
  tag: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Vender = mongoose.models.Vender || mongoose.model("Vender", venderSchema);

module.exports = Vender;