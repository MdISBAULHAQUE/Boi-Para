const sequelize = require('./config/database');
const models = require('./models');
require('dotenv').config();

const setupDatabase = async () => {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');

    console.log('Creating tables...');
    await sequelize.sync({ force: true });
    console.log('✅ All tables created successfully!');

    console.log('Database setup completed successfully!');
    console.log('Run "npm run seed" to populate with sample data');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Please check your PostgreSQL connection and database credentials');
    process.exit(1);
  }
};

setupDatabase();