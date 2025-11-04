# Boi Para - Bengali Book Marketplace

A comprehensive web application for buying and selling Bengali books, connecting readers with local bookstores.

## 🚀 Features

- **User Authentication**: Secure login/signup system
- **Book Catalog**: Browse extensive collection of Bengali books
- **Bookstore Directory**: Find local bookstores
- **Shopping Cart**: Add books to cart and checkout
- **Order Management**: Track orders and purchase history
- **Admin Dashboard**: Manage books, stores, and orders
- **Store Management**: Tools for bookstore owners
- **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **MySQL** database
- **Sequelize** ORM
- **JWT** authentication
- **bcrypt** for password hashing

## 📁 Project Structure

```
Collage-streeet/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── scripts/           # Database scripts
├── boi-para-vibes/        # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
│   └── server/            # Alternative server setup
└── SETUP_GUIDE.md        # Setup instructions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MdISBAULHAQUE/Boi-Para.git
   cd Boi-Para
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your database settings in .env
   npm run setup
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd boi-para-vibes
   npm install
   cp .env.example .env
   # Configure your API endpoints in .env
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=boi_para
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📖 Usage

1. **For Readers**:
   - Browse books by category
   - Search for specific titles
   - Add books to cart and checkout
   - Track order status

2. **For Bookstore Owners**:
   - Register your bookstore
   - Manage inventory
   - Process orders
   - View sales analytics

3. **For Admins**:
   - Manage all books and stores
   - Monitor system analytics
   - Handle user management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Md Isbaul Haque**
- GitHub: [@MdISBAULHAQUE](https://github.com/MdISBAULHAQUE)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by the love for Bengali literature
- Built with modern web technologies

---

Made with ❤️ for Bengali book lovers