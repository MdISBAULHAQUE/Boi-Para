const express = require('express');
const router = express.Router();

// Mock stores data
const stores = [
  {
    id: 'store1',
    name: 'Heritage Books',
    ownerName: 'Ramesh Chandra',
    established: 1952,
    rating: 4.8,
    reviews: 245,
    shopNo: '12A',
    lane: 'College Street',
    contactNumber: '+91 98765 43210',
    specialization: ['Bengali Literature', 'Philosophy', 'History'],
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
  }
];

// Get all stores
router.get('/', (req, res) => {
  const { search } = req.query;
  let filteredStores = [...stores];

  if (search) {
    filteredStores = filteredStores.filter(store =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      store.specialization.some(spec => 
        spec.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  res.json(filteredStores);
});

// Get store by ID
router.get('/:id', (req, res) => {
  const store = stores.find(s => s.id === req.params.id);
  if (!store) {
    return res.status(404).json({ message: 'Store not found' });
  }
  res.json(store);
});

module.exports = router;