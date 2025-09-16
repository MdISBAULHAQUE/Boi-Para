const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bookstore = sequelize.define('Bookstore', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shopNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lane: {
    type: DataTypes.ENUM('College Street', 'Bankim Chatterjee Street', 'Shyama Charan Dey Street'),
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  specialization: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  established: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  openHours: {
    type: DataTypes.STRING,
    defaultValue: '10:00 AM - 8:00 PM'
  },
  languages: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  totalBooks: {
    type: DataTypes.INTEGER,
    defaultValue: 1000
  }
}, {
  timestamps: true
});

module.exports = Bookstore;