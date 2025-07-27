const mongoose = require('./db');

const supplieritemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  itemname: String,
  price: Number
});

const SupplierItem = mongoose.models.SupplierItem || mongoose.model("SupplierItem", supplieritemSchema);

module.exports = SupplierItem;