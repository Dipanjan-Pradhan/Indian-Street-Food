const express = require('express');
const Supplier = require('../../models/supplier');
const router = express.Router();

// Create Supplier
router.post('/', async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Supplier by ID
router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Supplier
router.put('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Supplier
router.delete('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add supplier signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, phone, email, username, password } = req.body;
    const User = require('../../models/user');
    // Find existing user by name, phone, and email
    let user = await User.findOne({ name, phone, email });
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please register first.' });
    }
    // Check if username is already taken by another user
    const usernameTaken = await User.findOne({ username, _id: { $ne: user._id } });
    if (usernameTaken) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    // Update user with username, password, and type
    user.username = username;
    user.password = password;
    user.type = 'supplier';
    await user.save();
    // Create supplier profile if not already created
    let supplier = await Supplier.findOne({ user: user._id });
    if (!supplier) {
      supplier = new Supplier({ user: user._id });
      await supplier.save();
    }
    res.status(201).json({ message: 'Supplier registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add supplier login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const User = require('../../models/user');
    const user = await User.findOne({ username, type: 'supplier' });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 