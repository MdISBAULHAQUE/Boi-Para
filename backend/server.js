const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const models = require('./models');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const bookstoreRoutes = require('./routes/bookstores');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/bookstores', bookstoreRoutes);
app.use('/api/orders', orderRoutes);

// PostgreSQL connection
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    return sequelize.sync({ force: false, alter: true });
  })
  .then(() => console.log('Database synced with associations'))
  .catch(err => console.log('Database connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});