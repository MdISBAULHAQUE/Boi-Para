const { Sequelize } = require('sequelize');

const testConnection = async (password) => {
  const sequelize = new Sequelize({
    database: 'boi_para',
    username: 'postgres',
    password: password,
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
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
  const passwords = ['', 'postgres', 'password', '123456', 'admin'];
  
  console.log('Testing different PostgreSQL passwords...\n');
  
  for (const pwd of passwords) {
    const success = await testConnection(pwd);
    if (success) {
      console.log(`\n🎉 Use this password in your database config: "${pwd}"`);
      process.exit(0);
    }
  }
  
  console.log('\n❌ None of the common passwords worked.');
  console.log('Please check your PostgreSQL installation and set a password.');
  console.log('You can reset the postgres user password with:');
  console.log('ALTER USER postgres PASSWORD \'your_password\';');
};

tryPasswords();