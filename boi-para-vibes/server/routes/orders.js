const express = require('express');
const router = express.Router();

// Mock orders data
const orders = [];

// Create order
router.post('/', (req, res) => {
  const { userId, items, totalAmount, shippingAddress } = req.body;
  
  const order = {
    id: Date.now().toString(),
    userId,
    items,
    totalAmount,
    shippingAddress,
    status: 'pending',
    createdAt: new Date(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  };
  
  orders.push(order);
  res.status(201).json(order);
});

// Get user orders
router.get('/user/:userId', (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.params.userId);
  res.json(userOrders);
});

// Get order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

module.exports = router;