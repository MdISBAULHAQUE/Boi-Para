const User = require('./User');
const Book = require('./Book');
const Bookstore = require('./Bookstore');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// User associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Bookstore associations
Bookstore.hasMany(Book, { foreignKey: 'bookstoreId' });
Book.belongsTo(Bookstore, { foreignKey: 'bookstoreId' });

User.belongsTo(Bookstore, { foreignKey: 'storeId' });
Bookstore.hasMany(User, { foreignKey: 'storeId' });

// Order associations
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

OrderItem.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(OrderItem, { foreignKey: 'bookId' });

module.exports = {
  User,
  Book,
  Bookstore,
  Order,
  OrderItem
};