const mongoose = require('mongoose');

const bookstoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  shopNo: {
    type: String,
    required: true
  },
  lane: {
    type: String,
    enum: ['College Street', 'Bankim Chatterjee Street', 'Shyama Charan Dey Street'],
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: String,
  specialization: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  established: {
    type: Number,
    required: true
  },
  description: String,
  image: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  openHours: {
    type: String,
    default: '10:00 AM - 8:00 PM'
  },
  languages: {
    type: [String],
    default: []
  },
  totalBooks: {
    type: Number,
    default: 1000
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bookstore', bookstoreSchema);