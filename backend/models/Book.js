const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    unique: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    enum: ['Bengali Literature', 'Philosophy', 'Children\'s Books', 'Poetry', 'Rare Books', 'History', 'Fiction', 'Academic', 'Comics'],
    required: true
  },
  language: {
    type: String,
    enum: ['Bengali', 'English', 'Hindi'],
    required: true
  },
  description: String,
  cover: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  bookstoreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookstore',
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);