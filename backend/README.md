**EmpowerHer – Backend (Node.js + Express + MongoDB)**

This is the backend API of the EmpowerHer platform.
It provides authentication, product & service listings, orders, carts, bookings, reports, and reviews.

**Setup Instructions**

1. Move into Backend Folder
   cd backend
2. Install Dependencies
   npm install
3.Setup Environment Variables
  Create .env file (copy from .env.example):
  PORT=5000
  MONGO_URI=mongodb://127.0.0.1:27017/empowerher
  JWT_SECRET=your_jwt_secret_key
4.Run Server
  npm start
  Backend runs at: http://localhost:5000
  API base URL: http://localhost:5000/api

**API Endpoints**

  1. Authentication
    POST /api/auth/signup → Register new user
    POST /api/auth/login → Login user
    GET /api/auth/me → Get logged-in user profile (protected)
    PUT /api/auth/update-profile → Update profile (protected)
2. Products
    GET /api/products → Get all products
    POST /api/products → Add product (seller only)
    GET /api/products/:id → Get product details
    PUT /api/products/:id → Update product
    DELETE /api/products/:id → Delete product
3. Services
    GET /api/services → Get all services
    POST /api/services → Add service (seller only)
    GET /api/services/:id → Get service details
    PUT /api/services/:id → Update service
    DELETE /api/services/:id → Delete service
4. Bookings
    POST /api/bookings/book → Book a service
    GET /api/bookings/seller → View seller’s bookings
    GET /api/bookings/buyer → View buyer’s bookings
    PUT /api/bookings/:id/accept → Accept booking
    PUT /api/bookings/:id/reject → Reject booking
5. Cart
    POST /api/carts → Add to cart
    GET /api/carts → View cart
    DELETE /api/carts/:id → Remove item from cart
6.Orders
    POST /api/orders → Place new order
    GET /api/orders → Get all orders of logged-in user
7.Reports
    GET /api/seller-report → Seller sales & earnings report

**Database Collections**

1. Users – Buyers & sellers (name, email, password, role, etc.)
2. Products – Handmade products (title, description, price, seller info)
3. Services – Service offerings with location details
4. Bookings – Buyer & seller bookings with status
5. Carts – Items added by buyers
6. Orders – Buyer orders with payment status
7. Reviews – Product/service feedback
8. Reports – Seller performance reports
