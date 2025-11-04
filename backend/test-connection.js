const { Sequelize } = require('sequelize');
require('dotenv').config();

const testConnection = async (password) => {
  const sequelize = new Sequelize({
    database: 'boi_para',
    username: 'root',
    password: password,
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
  });

  try {
    await sequelize.authenticate();
    console.log(`✅ Connection successful with password: "${password}"`);
    return true;
  } catch (error) {
    console.log(`❌ Failed with password: "${password}" - ${error.message}`);
    return false;
  }
};

const tryPasswords = async () => {
  const passwords = ['', 'root', 'password', '123456', 'admin'];
  
  console.log('Testing different MySQL passwords...\n');
  
  for (const pwd of passwords) {
    const success = await testConnection(pwd);
    if (success) {
      console.log(`\n🎉 Use this password in your .env file: DB_PASSWORD=${pwd}`);
      process.exit(0);
    }
  }
  
  console.log('\n❌ None of the common passwords worked.');
  console.log('Please check your MySQL installation and set a password.');
  console.log('You can install MySQL from: https://dev.mysql.com/downloads/mysql/');
};

tryPasswords();