const mongoose = require('./db');

const supplierSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gstin: String,
  shopname: String,
  buisnesstype: String,
  location: String,
  experience: Number,
  specialization: String,
  image: {
    data: Buffer,
    contentType: String,
  }
});

const Supplier = mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;