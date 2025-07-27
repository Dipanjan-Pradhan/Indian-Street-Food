const express = require('express');
const Supplier = require('../../models/supplier');
const router = express.Router();
const multer = require('multer');

// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Create Supplier with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const supplierData = {
      user: req.body.user,
      gstin: req.body.gstin,
      shopname: req.body.shopname,
      buisnesstype: req.body.buisnesstype,
      location: req.body.location,
      experience: req.body.experience,
      specialization: req.body.specialization
    };
    
    // Add image data if provided
    if (req.file) {
      supplierData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }
    
    const supplier = new Supplier(supplierData);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Suppliers or filter by userId
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.userId) {
      query.user = req.query.userId;
    }
    const suppliers = await Supplier.find(query);
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

// Get Supplier image
router.get('/:id/image', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier || !supplier.image || !supplier.image.data) {
      return res.status(404).send('Image not found');
    }
    
    res.set('Content-Type', supplier.image.contentType);
    res.send(supplier.image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Supplier with image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const supplierData = {
      user: req.body.user,
      gstin: req.body.gstin,
      shopname: req.body.shopname,
      buisnesstype: req.body.buisnesstype,
      location: req.body.location,
      experience: req.body.experience,
      specialization: req.body.specialization
    };
    
    // Add image data if provided
    if (req.file) {
      supplierData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }
    
    // If no new image is provided and removeImage flag is set, remove the current image
    if (req.body.removeImage === 'true' && !req.file) {
      supplierData.image = null;
    }
    
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, supplierData, { new: true });
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