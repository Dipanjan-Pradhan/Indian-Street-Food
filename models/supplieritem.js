import mongoose from "mongoose";

const supplieritemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "vender" },
  itemname: String,
  price: Number
});

const SupplierItem = mongoose.models.SupplierItem || mongoose.model("SupplierItem", supplieritemSchema);

export default SupplierItem;