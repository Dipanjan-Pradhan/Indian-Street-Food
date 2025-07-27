const express = require('express');
const Vender = require('../../models/vender');
const router = express.Router();

// Create Vender
router.post('/', async (req, res) => {
  try {
    const vender = new Vender(req.body);
    await vender.save();
    res.status(201).json(vender);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Venders
router.get('/', async (req, res) => {
  try {
    const venders = await Vender.find();
    res.json(venders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Vender by ID
router.get('/:id', async (req, res) => {
  try {
    const vender = await Vender.findById(req.params.id);
    if (!vender) return res.status(404).json({ error: 'Not found' });
    res.json(vender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Vender
router.put('/:id', async (req, res) => {
  try {
    const vender = await Vender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vender) return res.status(404).json({ error: 'Not found' });
    res.json(vender);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Vender
router.delete('/:id', async (req, res) => {
  try {
    const vender = await Vender.findByIdAndDelete(req.params.id);
    if (!vender) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 