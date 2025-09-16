const sequelize = require('../config/database');

const clearAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('✅ All data cleared');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

clearAll();