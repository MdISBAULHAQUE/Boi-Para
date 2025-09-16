# Boi Para Backend

Backend API for the Boi Para bookstore application using Node.js, Express, and PostgreSQL.

## Setup

1. Install PostgreSQL on your system
2. Create a database named `boi_para`
3. Update `.env` file with your database credentials
4. Install dependencies: `npm install`
5. Run migrations: `npm run seed`
6. Start server: `npm run dev`

## Environment Variables

```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/boi_para
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Books
- GET `/api/books` - Get all books
- GET `/api/books/:id` - Get book by ID
- POST `/api/books` - Create book (Admin only)

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/my-orders` - Get user orders
- PUT `/api/orders/:id/status` - Update order status (Admin only)

### Bookstores
- GET `/api/bookstores` - Get all bookstores
- GET `/api/bookstores/:id` - Get bookstore by ID

## Database Schema

- Users (customers, store admins, super admin)
- Bookstores (physical stores)
- Books (inventory)
- Orders (customer orders)
- OrderItems (order line items)