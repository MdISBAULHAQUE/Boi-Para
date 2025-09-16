const express = require('express');
const Bookstore = require('../models/Bookstore');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all bookstores
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const bookstores = await Bookstore.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1 });

    const total = await Bookstore.countDocuments();

    res.json({
      bookstores,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get bookstore by ID
router.get('/:id', async (req, res) => {
  try {
    const bookstore = await Bookstore.findById(req.params.id);
    if (!bookstore) {
      return res.status(404).json({ message: 'Bookstore not found' });
    }

    // Get books from this bookstore
    const books = await Book.find({ bookstoreId: req.params.id }).limit(20);

    res.json({ bookstore, books });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create bookstore (Super Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bookstore = new Bookstore(req.body);
    await bookstore.save();

    res.status(201).json({ message: 'Bookstore created successfully', bookstore });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update bookstore
router.put('/:id', auth, async (req, res) => {
  try {
    // Check permissions
    if (req.user.role === 'store_admin' && req.user.storeId.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bookstore = await Bookstore.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bookstore) {
      return res.status(404).json({ message: 'Bookstore not found' });
    }

    res.json({ message: 'Bookstore updated successfully', bookstore });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete bookstore (Super Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Bookstore.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bookstore deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;