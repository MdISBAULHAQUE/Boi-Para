# Boi Para Database Setup Guide

## Step 1: Set PostgreSQL Password

1. Open Command Prompt as Administrator
2. Connect to PostgreSQL:
   ```
   psql -U postgres
   ```
3. Set password for postgres user:
   ```sql
   ALTER USER postgres PASSWORD 'postgres123';
   ```
4. Exit PostgreSQL:
   ```
   \q
   ```

## Step 2: Update Database Configuration

Update the password in `backend/config/database.js`:
```javascript
password: 'postgres123',  // Use the password you set above
```

## Step 3: Run Setup

```bash
cd backend
npm run setup
npm run seed
npm run dev
```

## Alternative: Use Different User

If you have a different PostgreSQL user, update these in `backend/config/database.js`:
- `username: 'your_username'`
- `password: 'your_password'`

## Verify Database

Check if `boi_para` database exists:
```sql
psql -U postgres
\l
```

If not, create it:
```sql
CREATE DATABASE boi_para;
```