const sequelize = require('../config/database');
const { User, Book, Bookstore } = require('../models');
require('dotenv').config();

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create Super Admin
    await User.create({
      name: 'Super Admin',
      email: 'admin@boipara.com',
      password: 'admin123',
      role: 'super_admin'
    });

    // Create Bookstores
    const bookstores = [
      {
        name: 'রবীন্দ্র পুস্তক ভবন',
        ownerName: 'অমিত চক্রবর্তী',
        shopNo: '15A',
        lane: 'College Street',
        contactNumber: '+91 98765 43210',
        email: 'rabindra.books@gmail.com',
        specialization: ['Bengali Literature', 'Poetry'],
        rating: 4.8,
        reviews: 156,
        established: 1965,
        description: 'রবীন্দ্রনাথের সম্পূর্ণ রচনাবলী এবং বাংলা সাহিত্যের বিশাল সংগ্রহ',
        isVerified: true,
        languages: ['Bengali', 'English']
      },
      {
        name: 'Academic Corner',
        ownerName: 'Dr. Rajesh Kumar',
        shopNo: '23B',
        lane: 'Bankim Chatterjee Street',
        contactNumber: '+91 87654 32109',
        email: 'academic.corner@yahoo.com',
        specialization: ['Academic', 'Philosophy'],
        rating: 4.6,
        reviews: 203,
        established: 1978,
        description: 'Complete academic solution for students',
        isVerified: true,
        languages: ['English', 'Hindi', 'Bengali']
      }
    ];

    const createdStores = await Bookstore.bulkCreate(bookstores);

    // Create Store Admins
    await User.bulkCreate([
      {
        name: 'অমিত চক্রবর্তী',
        email: 'amit@rabindra.com',
        password: 'store123',
        role: 'store_admin',
        storeId: createdStores[0].id
      },
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh@academic.com',
        password: 'store123',
        role: 'store_admin',
        storeId: createdStores[1].id
      }
    ]);

    // Create Sample Books
    const books = [
      {
        title: 'গীতাঞ্জলি',
        author: 'রবীন্দ্রনাথ ঠাকুর',
        price: 250,
        originalPrice: 300,
        category: 'Poetry',
        language: 'Bengali',
        description: 'রবীন্দ্রনাথের অমর কাব্যগ্রন্থ',
        stock: 50,
        bookstoreId: createdStores[0].id,
        rating: 4.9
      },
      {
        title: 'Philosophy of Mind',
        author: 'David Chalmers',
        price: 850,
        category: 'Philosophy',
        language: 'English',
        description: 'Contemporary philosophy of consciousness',
        stock: 25,
        bookstoreId: createdStores[1].id,
        rating: 4.5
      }
    ];

    await Book.bulkCreate(books);

    // Create Sample Customer
    await User.create({
      name: 'রহিম উদ্দিন',
      email: 'customer@example.com',
      password: 'customer123',
      role: 'customer'
    });

    console.log('Seed data created successfully!');
    console.log('Super Admin: admin@boipara.com / admin123');
    console.log('Store Admin 1: amit@rabindra.com / store123');
    console.log('Store Admin 2: rajesh@academic.com / store123');
    console.log('Customer: customer@example.com / customer123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();