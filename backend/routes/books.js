const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const { category, language, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (language) query.language = language;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const books = await Book.find(query)
      .populate('bookstoreId', 'name ownerName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('bookstoreId')
      .populate('reviews.user', 'name');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new book (Store Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'store_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bookData = { ...req.body };
    if (req.user.role === 'store_admin') {
      bookData.bookstoreId = req.user.storeId;
    }

    const book = new Book(bookData);
    await book.save();

    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update book
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check permissions
    if (req.user.role === 'store_admin' && book.bookstoreId.toString() !== req.user.storeId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check permissions
    if (req.user.role === 'store_admin' && book.bookstoreId.toString() !== req.user.storeId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;