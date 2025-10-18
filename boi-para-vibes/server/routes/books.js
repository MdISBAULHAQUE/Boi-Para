const express = require('express');
const router = express.Router();

// Mock books data
const books = [
  {
    id: '1',
    title: 'The Mahabharata',
    author: 'Vyasa',
    price: '₹899',
    rating: 4.8,
    category: 'Epic Literature',
    description: 'Ancient Indian epic',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    inStock: true,
    storeId: 'store1'
  }
];

// Get all books
router.get('/', (req, res) => {
  const { category, search, storeId } = req.query;
  let filteredBooks = [...books];

  if (category) {
    filteredBooks = filteredBooks.filter(book => 
      book.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (search) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (storeId) {
    filteredBooks = filteredBooks.filter(book => book.storeId === storeId);
  }

  res.json(filteredBooks);
});

// Get book by ID
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// Add new book (admin only)
router.post('/', (req, res) => {
  const newBook = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = router;