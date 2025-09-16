const sequelize = require('../config/database');
const { User, Book, Bookstore } = require('../models');

const checkData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');
    
    const bookstores = await Bookstore.findAll();
    const books = await Book.findAll();
    const users = await User.findAll();
    
    console.log(`\nBookstores: ${bookstores.length}`);
    bookstores.forEach(b => console.log(`- ${b.name}`));
    
    console.log(`\nBooks: ${books.length}`);
    books.slice(0, 5).forEach(b => console.log(`- ${b.title} by ${b.author}`));
    
    console.log(`\nUsers: ${users.length}`);
    users.forEach(u => console.log(`- ${u.name} (${u.email})`));
    
    console.log('\n✅ Data check complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkData();