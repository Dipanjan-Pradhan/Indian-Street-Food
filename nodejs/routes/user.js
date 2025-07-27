const express = require('express');
const User = require('../../models/user');
const router = express.Router();

// Create User
router.post('/', async (req, res) => {
  try {
    // Map frontend fields to schema fields
    const mapped = {
      name: req.body.fullName,
      phone: req.body.mobile,
      email: req.body.email,
      type: req.body.userType,
    };
    // Check for duplicate (all 3 fields must match)
    const existing = await User.findOne({
      name: mapped.name,
      phone: mapped.phone,
      email: mapped.email
    });
    if (existing) {
      return res.status(409).json({ error: 'User already registered with this name, phone, and email.' });
    }
    const user = new User(mapped);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 