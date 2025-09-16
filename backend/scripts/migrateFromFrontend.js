const sequelize = require('../config/database');
const { User, Book, Bookstore } = require('../models');
const fs = require('fs');
const path = require('path');

// Import frontend data
const frontendDataPath = '../../boi-para-vibes/src/data';

const migrateAllData = async () => {
  try {
    console.log('🔄 Starting data migration from frontend...');
    
    // Read bookstores data
    const bookstoresPath = path.join(__dirname, frontendDataPath, 'bookstores.ts');
    const booksPath = path.join(__dirname, frontendDataPath, 'books.ts');
    
    // Clear existing data
    await sequelize.sync({ force: true });
    console.log('✅ Database cleared and synced');

    // Create comprehensive bookstores from frontend data
    const bookstores = await Bookstore.bulkCreate([
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
        specialization: ['Academic Books', 'Engineering'],
        rating: 4.6,
        reviews: 203,
        established: 1978,
        description: 'Complete academic solution for students',
        isVerified: true,
        languages: ['English', 'Hindi', 'Bengali']
      },
      {
        name: 'দেশ বিদেশের বই',
        ownerName: 'সুব্রত দাস',
        shopNo: '8C',
        lane: 'Shyama Charan Dey Street',
        contactNumber: '+91 76543 21098',
        specialization: ['Fiction', 'Travel'],
        rating: 4.7,
        reviews: 89,
        established: 1982,
        description: 'বিশ্বসাহিত্যের অনুবাদ এবং মৌলিক রচনার বিশেষ সংগ্রহ',
        isVerified: true,
        languages: ['Bengali', 'English']
      },
      {
        name: 'Rare Books Emporium',
        ownerName: 'Anil Bhattacharya',
        shopNo: '31A',
        lane: 'College Street',
        contactNumber: '+91 65432 10987',
        email: 'rarebooks.emporium@gmail.com',
        specialization: ['Rare Books', 'First Editions'],
        rating: 4.9,
        reviews: 67,
        established: 1955,
        description: 'Collectors paradise with rare manuscripts',
        isVerified: true,
        languages: ['English', 'Bengali']
      },
      {
        name: 'শিশু কিশোর গ্রন্থালয়',
        ownerName: 'মীরা সেন',
        shopNo: '12D',
        lane: 'Bankim Chatterjee Street',
        contactNumber: '+91 54321 09876',
        specialization: ["Children's Books", 'Comics'],
        rating: 4.5,
        reviews: 124,
        established: 1990,
        description: 'শিশুদের জন্য বিশেষ বই এবং শিক্ষামূলক উপকরণ',
        isVerified: true,
        languages: ['Bengali', 'English']
      },
      {
        name: 'Philosophy & Wisdom',
        ownerName: 'Prof. Debashis Roy',
        shopNo: '19E',
        lane: 'College Street',
        contactNumber: '+91 43210 98765',
        email: 'philosophy.wisdom@outlook.com',
        specialization: ['Philosophy', 'Religion'],
        rating: 4.4,
        reviews: 78,
        established: 1973,
        description: 'Deep philosophical texts and spiritual literature',
        isVerified: true,
        languages: ['English', 'Bengali']
      }
    ]);

    // Create users
    await User.bulkCreate([
      {
        name: 'Super Admin',
        email: 'admin@boipara.com',
        password: 'admin123',
        role: 'super_admin'
      },
      {
        name: 'অমিত চক্রবর্তী',
        email: 'amit@rabindra.com',
        password: 'store123',
        role: 'store_admin',
        storeId: bookstores[0].id
      },
      {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh@academic.com',
        password: 'store123',
        role: 'store_admin',
        storeId: bookstores[1].id
      },
      {
        name: 'রহিম উদ্দিন',
        email: 'customer@example.com',
        password: 'customer123',
        role: 'customer'
      }
    ]);

    // Create comprehensive book collection from frontend data
    const allBooks = [
      // Bengali Literature (from frontend)
      { title: 'গীতাঞ্জলি', author: 'রবীন্দ্রনাথ ঠাকুর', price: 450, originalPrice: 600, category: 'Bengali Literature', language: 'Bengali', description: 'নোবেল পুরস্কার বিজয়ী কবিতার সংকলন', stock: 50, bookstoreId: bookstores[0].id, rating: 4.9 },
      { title: 'পথের পাঁচালী', author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়', price: 380, originalPrice: 500, category: 'Bengali Literature', language: 'Bengali', description: 'গ্রামীণ জীবনের ক্লাসিক বাংলা উপন্যাস', stock: 35, bookstoreId: bookstores[0].id, rating: 4.8 },
      { title: 'চোখের বালি', author: 'রবীন্দ্রনাথ ঠাকুর', price: 420, originalPrice: 580, category: 'Bengali Literature', language: 'Bengali', description: 'প্রেম ও সমাজের কালজয়ী গল্প', stock: 40, bookstoreId: bookstores[0].id, rating: 4.8 },
      { title: 'গোরা', author: 'রবীন্দ্রনাথ ঠাকুর', price: 520, originalPrice: 750, category: 'Bengali Literature', language: 'Bengali', description: 'পরিচয় ও জাতীয়তাবাদের উপন্যাস', stock: 30, bookstoreId: bookstores[0].id, rating: 4.7 },
      { title: 'দেবদাস', author: 'শরৎচন্দ্র চট্টোপাধ্যায়', price: 320, originalPrice: 450, category: 'Bengali Literature', language: 'Bengali', description: 'ট্র্যাজিক প্রেমের গল্প', stock: 45, bookstoreId: bookstores[0].id, rating: 4.5 },
      { title: 'শেষের কবিতা', author: 'রবীন্দ্রনাথ ঠাকুর', price: 400, originalPrice: 550, category: 'Bengali Literature', language: 'Bengali', description: 'আধুনিক প্রেমের কাব্যিক উপন্যাস', stock: 25, bookstoreId: bookstores[0].id, rating: 4.6 },
      { title: 'পল্লীসমাজ', author: 'শরৎচন্দ্র চট্টোপাধ্যায়', price: 350, originalPrice: 480, category: 'Bengali Literature', language: 'Bengali', description: 'গ্রামীণ সমাজের চিত্র', stock: 30, bookstoreId: bookstores[0].id, rating: 4.4 },
      { title: 'আনন্দমঠ', author: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়', price: 380, originalPrice: 520, category: 'Bengali Literature', language: 'Bengali', description: 'বাংলা রেনেসাঁসের বিপ্লবী উপন্যাস', stock: 30, bookstoreId: bookstores[0].id, rating: 4.5 },
      { title: 'কপালকুণ্ডলা', author: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়', price: 340, originalPrice: 460, category: 'Bengali Literature', language: 'Bengali', description: 'রোমান্টিক উপন্যাসের অগ্রদূত', stock: 25, bookstoreId: bookstores[0].id, rating: 4.3 },
      { title: 'শ্রীকান্ত', author: 'শরৎচন্দ্র চট্টোপাধ্যায়', price: 420, originalPrice: 580, category: 'Bengali Literature', language: 'Bengali', description: 'জীবনের জটিলতার গল্প', stock: 35, bookstoreId: bookstores[0].id, rating: 4.6 },
      
      // Fiction (from frontend)
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 450, originalPrice: 600, category: 'Fiction', language: 'English', description: 'A gripping tale of racial injustice and childhood innocence', stock: 25, bookstoreId: bookstores[2].id, rating: 4.8 },
      { title: '1984', author: 'George Orwell', price: 420, originalPrice: 580, category: 'Fiction', language: 'English', description: 'Dystopian masterpiece about totalitarian control', stock: 30, bookstoreId: bookstores[2].id, rating: 4.7 },
      { title: 'Pride and Prejudice', author: 'Jane Austen', price: 380, originalPrice: 520, category: 'Fiction', language: 'English', description: 'Classic romance and social commentary', stock: 20, bookstoreId: bookstores[2].id, rating: 4.6 },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 400, originalPrice: 550, category: 'Fiction', language: 'English', description: 'Jazz Age American dream and disillusionment', stock: 22, bookstoreId: bookstores[2].id, rating: 4.5 },
      { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', price: 520, originalPrice: 720, category: 'Fiction', language: 'English', description: 'Magical realism masterpiece', stock: 18, bookstoreId: bookstores[2].id, rating: 4.8 },
      
      // Academic (from frontend)
      { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', price: 1200, originalPrice: 1500, category: 'Academic', language: 'English', description: 'Comprehensive guide to computer algorithms', stock: 15, bookstoreId: bookstores[1].id, rating: 4.7 },
      { title: 'Calculus: Early Transcendentals', author: 'James Stewart', price: 980, originalPrice: 1200, category: 'Academic', language: 'English', description: 'Essential calculus textbook for engineering students', stock: 20, bookstoreId: bookstores[1].id, rating: 4.5 },
      { title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', price: 1100, originalPrice: 1400, category: 'Academic', language: 'English', description: 'Comprehensive organic chemistry reference', stock: 12, bookstoreId: bookstores[1].id, rating: 4.6 },
      { title: 'Principles of Economics', author: 'N. Gregory Mankiw', price: 850, originalPrice: 1100, category: 'Academic', language: 'English', description: 'Fundamental economics textbook', stock: 18, bookstoreId: bookstores[1].id, rating: 4.4 },
      { title: 'Campbell Biology', author: 'Jane B. Reece', price: 1300, originalPrice: 1600, category: 'Academic', language: 'English', description: 'Comprehensive biology textbook', stock: 10, bookstoreId: bookstores[1].id, rating: 4.8 },
      
      // Poetry (from frontend)
      { title: 'Leaves of Grass', author: 'Walt Whitman', price: 380, originalPrice: 520, category: 'Poetry', language: 'English', description: 'Revolutionary American poetry collection', stock: 15, bookstoreId: bookstores[0].id, rating: 4.6 },
      { title: 'The Waste Land', author: 'T.S. Eliot', price: 320, originalPrice: 450, category: 'Poetry', language: 'English', description: 'Modernist poetry masterpiece', stock: 20, bookstoreId: bookstores[0].id, rating: 4.5 },
      { title: 'Paradise Lost', author: 'John Milton', price: 450, originalPrice: 600, category: 'Poetry', language: 'English', description: 'Epic poem about the fall of man', stock: 12, bookstoreId: bookstores[0].id, rating: 4.7 },
      { title: 'The Divine Comedy', author: 'Dante Alighieri', price: 520, originalPrice: 720, category: 'Poetry', language: 'English', description: 'Medieval epic journey through afterlife', stock: 10, bookstoreId: bookstores[0].id, rating: 4.8 },
      { title: 'Songs of Innocence and Experience', author: 'William Blake', price: 350, originalPrice: 480, category: 'Poetry', language: 'English', description: 'Romantic poetry with mystical themes', stock: 15, bookstoreId: bookstores[0].id, rating: 4.4 },
      
      // Philosophy (from frontend)
      { title: 'The Republic', author: 'Plato', price: 420, originalPrice: 580, category: 'Philosophy', language: 'English', description: 'Foundational work on justice and ideal state', stock: 18, bookstoreId: bookstores[5].id, rating: 4.6 },
      { title: 'Meditations', author: 'Marcus Aurelius', price: 350, originalPrice: 480, category: 'Philosophy', language: 'English', description: 'Stoic philosophy and personal reflections', stock: 25, bookstoreId: bookstores[5].id, rating: 4.7 },
      { title: 'Being and Time', author: 'Martin Heidegger', price: 650, originalPrice: 850, category: 'Philosophy', language: 'English', description: 'Fundamental ontology and existentialism', stock: 8, bookstoreId: bookstores[5].id, rating: 4.3 },
      { title: 'Critique of Pure Reason', author: 'Immanuel Kant', price: 580, originalPrice: 780, category: 'Philosophy', language: 'English', description: 'Critical philosophy and limits of knowledge', stock: 12, bookstoreId: bookstores[5].id, rating: 4.4 },
      { title: 'The Nicomachean Ethics', author: 'Aristotle', price: 450, originalPrice: 620, category: 'Philosophy', language: 'English', description: 'Classical work on virtue ethics', stock: 16, bookstoreId: bookstores[5].id, rating: 4.5 },
      
      // Rare Books (from frontend)
      { title: 'First Folio of Shakespeare', author: 'William Shakespeare', price: 25000, originalPrice: 35000, category: 'Rare Books', language: 'English', description: '1623 first collected edition of Shakespeares plays', stock: 1, bookstoreId: bookstores[3].id, rating: 5.0 },
      { title: 'Origin of Species (First Edition)', author: 'Charles Darwin', price: 18000, originalPrice: 25000, category: 'Rare Books', language: 'English', description: '1859 first edition of evolutionary theory', stock: 1, bookstoreId: bookstores[3].id, rating: 4.9 },
      { title: 'Principia Mathematica', author: 'Isaac Newton', price: 22000, originalPrice: 30000, category: 'Rare Books', language: 'English', description: '1687 foundational work in physics and mathematics', stock: 1, bookstoreId: bookstores[3].id, rating: 5.0 },
      { title: 'The Gutenberg Bible', author: 'Johannes Gutenberg', price: 50000, originalPrice: 75000, category: 'Rare Books', language: 'English', description: '15th century printed Bible, extremely rare', stock: 1, bookstoreId: bookstores[3].id, rating: 5.0 },
      { title: 'Alice in Wonderland (First Edition)', author: 'Lewis Carroll', price: 15000, originalPrice: 20000, category: 'Rare Books', language: 'English', description: '1865 first edition of the beloved childrens classic', stock: 1, bookstoreId: bookstores[3].id, rating: 4.8 },
      
      // Children's Books
      { title: 'হাসি খুশির গল্প', author: 'সুকুমার রায়', price: 180, originalPrice: 250, category: "Children's Books", language: 'Bengali', description: 'শিশুদের মজার গল্প', stock: 50, bookstoreId: bookstores[4].id, rating: 4.8 },
      { title: 'Alice in Wonderland', author: 'Lewis Carroll', price: 320, originalPrice: 450, category: "Children's Books", language: 'English', description: 'Classic childrens fantasy adventure', stock: 30, bookstoreId: bookstores[4].id, rating: 4.7 },
      { title: 'The Lion King', author: 'Disney', price: 250, originalPrice: 350, category: "Children's Books", language: 'English', description: 'Beloved Disney story', stock: 40, bookstoreId: bookstores[4].id, rating: 4.6 },
      { title: 'গোপাল ভাঁড়ের গল্প', author: 'বিভিন্ন লেখক', price: 150, originalPrice: 200, category: "Children's Books", language: 'Bengali', description: 'হাস্যরসাত্মক গল্প', stock: 60, bookstoreId: bookstores[4].id, rating: 4.5 }
    ];

    await Book.bulkCreate(allBooks);

    console.log('✅ All frontend data migrated successfully!');
    console.log(`📚 Created ${bookstores.length} bookstores`);
    console.log(`📖 Created ${allBooks.length} books`);
    console.log('👥 Created 4 users');
    console.log('\n🔑 Login credentials:');
    console.log('Super Admin: admin@boipara.com / admin123');
    console.log('Store Admin 1: amit@rabindra.com / store123');
    console.log('Store Admin 2: rajesh@academic.com / store123');
    console.log('Customer: customer@example.com / customer123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateAllData();