# Pantry Inventory System

This is a full-stack pantry inventory system with:

- Node.js + Express backend with SQLite database
- Basic Auth middleware for authentication
- React frontend with TailwindCSS for styling
- Features: pagination, search, sorting, add/update/delete items
- User role-based access (admin vs regular user)
- Expired item warning colors and out-of-stock styling

---

## Setup Instructions

### Backend

1. Go to `backend` folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Run the server:
```bash
npm start
```

4. Server will run on `http://localhost:4000`

### Frontend

1. Go to `frontend` folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the dev server:
```bash
npm run dev
```

4. Open the URL shown in the terminal (usually `http://localhost:5173`)

---

## Default Login Credentials

- Username: `admin`
- Password: `admin`

---

## Quick Start

For convenience, you can use the provided startup script to run both services:

```bash
cd pantry-inventory-system
./start.sh
```

This will start both the backend and frontend servers simultaneously.

## Sample Data

To populate the database with sample inventory items, you can run the SQL commands in `backend/sample-data.sql`. The backend will automatically create the database schema on first run.

## Project Structure

```
pantry-inventory-system/
│
├── backend/
│   ├── db.js                 # Database configuration
│   ├── server.js            # Main server file
│   ├── auth.js              # Basic Auth middleware
│   ├── routes/
│   │   ├── items.js         # Items CRUD API
│   │   └── users.js         # User management API
│   ├── package.json
│   └── sample-data.sql      # Sample inventory data
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main app component
│   │   ├── index.jsx        # Entry point
│   │   ├── components/
│   │   │   ├── ItemList.jsx # Inventory table component
│   │   │   └── Login.jsx    # Login form
│   │   └── utils/
│   │       └── api.js       # API communication
│   ├── package.json
│   ├── tailwind.config.js   # Tailwind CSS config
│   ├── vite.config.js       # Vite build config
│   └── index.html           # HTML template
│
├── start.sh                 # Convenience startup script
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Features

- **Authentication**: Basic Auth with admin/user roles
- **Inventory Management**: Add, edit, delete pantry items
- **Search & Filter**: Search by item name, sort by expiration or category
- **Pagination**: Handle large inventories efficiently
- **Visual Indicators**: Expired items highlighted in red, out-of-stock items grayed out
- **Responsive Design**: Works on desktop and mobile devices

## Notes

- Basic Auth credentials are hardcoded in the frontend API calls for demo purposes.
- To add more users, insert into the `users` table in SQLite.
- This project can be extended with proper token-based authentication and UI enhancements.