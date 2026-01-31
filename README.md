## Restaurant Admin Dashboard

A full-stack restaurant management application built with React, Node.js, Express, and MongoDB. This dashboard allows restaurant owners to manage menu items, track orders, and monitor inventory in real-time.

## Features Implemented

# Menu Management

✅ Create, read, update, and delete menu items

✅ Search menu items with debounced search (300ms delay)

✅ Filter by category and availability status

✅ Toggle item availability with optimistic UI updates

✅ Responsive grid layout with item cards

✅ Real-time validation and error handling

# Orders Dashboard

✅ View all orders with pagination (10 per page)

✅ Filter orders by status (Pending, Preparing, Ready, Delivered, Cancelled)

✅ Update order status with dropdown selection

✅ Expandable order details showing all items

✅ Real-time status badges with color coding

# Technical Highlights

✅ Custom useDebounce hook for optimized search

✅ Custom useFetch hook for data fetching

✅ MongoDB text indexing for fast search

✅ Optimistic UI updates with error rollback

✅ Toast notifications for user feedback

✅ Comprehensive error handling

✅ RESTful API design

✅ MongoDB aggregation pipeline for analytics (top-selling items)

✅ Input validation using Mongoose schemas

✅ Responsive design for all screen sizes

# 📋 Prerequisites

Node.js (v14 or higher)

MongoDB (local installation or MongoDB Atlas account)

npm or yarn package manager

# 🛠️ Installation

1. Clone the repository

git clone <your-repo-url>

cd restaurant-dashboard

# 2. Backend Setup

cd backend

npm install

Create a .env file in the backend directory:

MONGODB_URI=mongodb://localhost:27017/restaurant-dashboard

PORT=5000

NODE_ENV=development

FRONTEND_URL=http://localhost:3000

For MongoDB Atlas, use:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurant-dashboard

# 3. Frontend Setup

cd frontend

npm install

Create a .env file in the frontend directory:

REACT_APP_API_URL=http://localhost:5000

# 🎯 Running the Application

Start Backend Server

cd backend

npm run dev

Server will run on http://localhost:5000

Seed Database (Optional but Recommended)

cd backend

npm run seed

This populates the database with 15 sample menu items and 10 orders.

Start Frontend

cd frontend

npm start

Application will open at http://localhost:3000

📡 API Documentation

Menu Items Endpoints

Get All Menu Items

GET /api/menu

Query Parameters:
  - category: string (Appetizer, Main Course, Dessert, Beverage)
  - availability: boolean
  - minPrice: number
  - maxPrice: number

Response:
{
  "success": true,
  "count": 15,
  "data": [...]
}

Search Menu Items

GET /api/menu/search?q=pizza

Response:
{
  "success": true,
  "count": 2,
  "data": [...]
}

Get Single Menu Item

GET /api/menu/:id

Response:
{
  "success": true,
  "data": {...}
}

Create Menu Item

POST /api/menu

Body:
{
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "category": "Main Course",
  "price": 14.99,
  "ingredients": ["Dough", "Tomato Sauce", "Mozzarella"],
  "preparationTime": 20,
  "isAvailable": true,
  "imageUrl": "https://example.com/image.jpg"
}

Response:
{
  "success": true,
  "data": {...}
}

Update Menu Item

PUT /api/menu/:id

Body: (same as create)

Response:
{
  "success": true,
  "data": {...}
}

Delete Menu Item

DELETE /api/menu/:id

Response:
{
  "success": true,
  "data": {}
}

Toggle Availability

PATCH /api/menu/:id/availability

Response:
{
  "success": true,
  "data": {...}
}

Orders Endpoints

Get All Orders

GET /api/orders

Query Parameters:
  - status: string
  - page: number (default: 1)
  - limit: number (default: 10)

Response:
{
  "success": true,
  "count": 10,
  "total": 25,
  "page": 1,
  "pages": 3,
  "data": [...]
}

Get Single Order

GET /api/orders/:id

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "orderNumber": "ORD-20240131-0001",
    "items": [...],
    "totalAmount": 45.50,
    "status": "Pending",
    "customerName": "John Doe",
    "tableNumber": 5
  }
}

Create Order

POST /api/orders

Body:
{
  "items": [
    {
      "menuItem": "menu_item_id",
      "quantity": 2
    }
  ],
  "customerName": "Jane Smith",
  "tableNumber": 3
}

Response:
{
  "success": true,
  "data": {...}
}

Update Order Status

PATCH /api/orders/:id/status

Body:
{
  "status": "Preparing"
}

Response:
{
  "success": true,
  "data": {...}
}

Get Top Selling Items (Analytics)

GET /api/orders/analytics/top-items

Response:
{
  "success": true,
  "data": [
    {
      "menuItemId": "...",
      "name": "Margherita Pizza",
      "category": "Main Course",
      "price": 14.99,
      "totalQuantity": 45,
      "totalRevenue": 674.55
    },
    ...
  ]
}


## 🎨 Technical Challenges Solutions

Challenge 1: Debounced Search

Implementation:

Created custom useDebounce hook that delays API calls by 300ms

Shows loading indicator while searching

Handles edge cases (empty search, special characters)

Automatically triggers search when user stops typing

Code Location: frontend/src/hooks/useDebounce.js

# Challenge 2: MongoDB Aggregation

Implementation:

Aggregation pipeline for top 5 selling items

Uses $unwind, $group, $lookup, $sort, and $limit

Calculates both quantity sold and total revenue

Joins Orders with MenuItems collections

Code Location: backend/controllers/orderController.js (getTopSellingItems function)
# Challenge 3: Optimistic UI Updates

Implementation:

Immediately updates UI when toggling availability

Makes API call in background

Rolls back changes if API fails

Shows toast notification for success/failure

Code Location: frontend/src/pages/MenuManagement.js (handleToggleAvailability function)

# 🚀 Deployment Guide

MongoDB Atlas Setup

Create account at mongodb.com/cloud/atlas

Create new cluster (M0 free tier)

Whitelist IP: 0.0.0.0/0 (for testing) or specific IPs

Create database user with read/write permissions

Get connection string and update backend .env

# Backend Deployment (Render)

Create account at render.com

Create new Web Service

Connect GitHub repository

Build command: npm install

Start command: node server.js

Add environment variables:

MONGODB_URI: Your MongoDB Atlas connection string

PORT: 5000

NODE_ENV: production

FRONTEND_URL: Your netlify URL


Deploy and note the backend URL

Frontend Deployment (netlify)

Create account at netlify.com

Connect GitHub repository

Build command: npm run build

Publish directory: dist

Add environment variable:

REACT_APP_API_URL: Your Render backend URL


Deploy and get live URL

Post-Deployment

Update backend CORS settings with netlify URL

Run seed script to populate production database



📸 Screenshots

# Menu Management

<img width="1240" height="1915" alt="image" src="https://github.com/user-attachments/assets/a7bd9b65-b62f-4022-a932-6e15feb8d486" />

# Orders Dashboard

<img width="1240" height="1728" alt="image" src="https://github.com/user-attachments/assets/7b27e134-e320-4e17-9920-3502c9247a58" />



API Testing:

Health check: GET http://localhost:5000/api/health

Top items analytics: GET http://localhost:5000/api/orders/analytics/top-items



# 🔧 Technologies Used

# Frontend:

React 18.2

React Router DOM 6.20

Axios 1.6

CSS3 (Custom styling, no frameworks)

#Backend:

Node.js

Express.js 4.18

MongoDB with Mongoose 8.0

express-validator 7.0

CORS

dotenv

# 🎯 Bonus Features Implemented

✅ Environment variables configuration

✅ Input validation using Mongoose schemas

✅ Context API for global state (Toast notifications)

✅ Responsive design (mobile-friendly)

✅ MongoDB aggregation for analytics

✅ Text indexing for efficient search

✅ Auto-generated order numbers

✅ Comprehensive error handling

✅ Loading states throughout the app

# 🐛 Known Issues & Future Enhancements

Future Enhancements:

Add authentication and authorization

Implement real-time updates using WebSockets

Add more analytics and reporting features

Implement image upload functionality

Add print receipt feature

Export orders to CSV/PDF

# 📝 Challenges Faced & Solutions

# Text Search Performance:

Challenge: Slow search across multiple fields

Solution: Implemented MongoDB text indexes on name and ingredients fields


# State Management:

Challenge: Managing complex state across components

Solution: Used Context API for global state and custom hooks for reusable logic


# Optimistic Updates:

Challenge: Handling failed API calls after UI updates

Solution: Implemented rollback mechanism with proper error handling


# Pagination:

Challenge: Efficient pagination with MongoDB

Solution: Used skip/limit with count queries for accurate page numbers



👨‍💻 Author

sanjay aggi

📄 License
MIT License
