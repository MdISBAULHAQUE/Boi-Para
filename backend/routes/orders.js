const express = require('express');
const { Order, OrderItem, Book, User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    let totalAmount = 0;
    for (const item of items) {
      const book = await Book.findByPk(item.bookId);
      if (!book || book.stock < item.quantity) {
        return res.status(400).json({ message: 'Invalid book or insufficient stock' });
      }
      totalAmount += parseFloat(book.price) * item.quantity;
    }

    const order = await Order.create({
      userId: req.user.userId,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    for (const item of items) {
      const book = await Book.findByPk(item.bookId);
      await OrderItem.create({
        orderId: order.id,
        bookId: item.bookId,
        quantity: item.quantity,
        price: book.price
      });
      await book.update({ stock: book.stock - item.quantity });
    }

    res.status(201).json({ message: 'Order created successfully', orderId: order.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.userId },
      include: [{
        model: OrderItem,
        include: [{ model: Book, attributes: ['title', 'author', 'cover'] }]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'super_admin' && req.user.role !== 'store_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    let query = {};
    if (req.user.role === 'store_admin') {
      query = { 'items.bookstore': req.user.storeId };
    }

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.book', 'title author')
      .populate('items.bookstore', 'name')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status
router.put('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'super_admin' && req.user.role !== 'store_admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const [updated] = await Order.update({ status }, { where: { id: req.params.id } });

    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;