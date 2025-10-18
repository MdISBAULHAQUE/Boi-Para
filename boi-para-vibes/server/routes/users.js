const express = require('express');
const router = express.Router();

// Get user profile
router.get('/:id', (req, res) => {
  // Mock user data (replace with database query)
  const user = {
    id: req.params.id,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    joinedAt: new Date('2024-01-01'),
    preferences: {
      categories: ['Fiction', 'Philosophy'],
      language: 'English'
    }
  };
  
  res.json(user);
});

// Update user profile
router.put('/:id', (req, res) => {
  const { name, email, preferences } = req.body;
  
  // Mock update (replace with database update)
  const updatedUser = {
    id: req.params.id,
    name,
    email,
    preferences,
    updatedAt: new Date()
  };
  
  res.json(updatedUser);
});

module.exports = router;