const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    unique: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: 0
    }
  },
  category: {
    type: DataTypes.ENUM('Bengali Literature', 'Philosophy', 'Children\'s Books', 'Poetry', 'Rare Books', 'History', 'Fiction', 'Academic', 'Comics'),
    allowNull: false
  },
  language: {
    type: DataTypes.ENUM('Bengali', 'English', 'Hindi'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  cover: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  bookstoreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Bookstores',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  }
}, {
  timestamps: true
});

module.exports = Book;