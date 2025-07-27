const express = require('express');
const SupplierItem = require('../../models/supplieritem');
const router = express.Router();

// Create SupplierItem
router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Bulk insert
      const items = await SupplierItem.insertMany(req.body);
      res.status(201).json(items);
    } else {
      // Single item
      const item = new SupplierItem(req.body);
      await item.save();
      res.status(201).json(item);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all SupplierItems
router.get('/', async (req, res) => {
  try {
    const items = await SupplierItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get SupplierItem by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await SupplierItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update SupplierItem
router.put('/:id', async (req, res) => {
  try {
    const item = await SupplierItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete SupplierItem
router.delete('/:id', async (req, res) => {
  try {
    const item = await SupplierItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 