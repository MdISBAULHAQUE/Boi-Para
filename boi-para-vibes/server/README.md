# Boi Para Backend API

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Run Production Server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book (admin)

### Stores
- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get store by ID

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Health Check
- `GET /api/health` - Server status

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure MongoDB connection
3. Set secure JWT_SECRET
4. Configure CORS for your domain
5. Set up SSL/HTTPS
6. Configure payment gateway
7. Set up email service