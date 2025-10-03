**EmpowerHer – Frontend (React.js)**

This is the frontend of the EmpowerHer platform.
It provides a user-friendly interface for buyers and sellers to interact with the system.

**Setup Instructions**

1. Move into Frontend Folder
   cd frontend
2. Install Dependencies
   npm install
3. Setup Environment Variables
   Create .env file (copy from .env.example):
   REACT_APP_API_URL=http://localhost:5000/api
4. Run Frontend
   npm start
   Frontend runs at: http://localhost:3000
   It will connect to the backend API at REACT_APP_API_URL.
   
**Project Structure**

  frontend/
  ├─ public/              # Static assets
  ├─ src/
  │  ├─ assets/           # Images, icons
  │  ├─ components/       # Reusable UI components
  │  ├─ context/          # Context API for state management
  │  ├─ pages/            # Page components (Home, Login, Signup, etc.)
  │  ├─ services/         # API wrappers
  │  ├─ utils/            # Helper utilities (API config)
  │  └─ App.js            # Main routes
  ├─ package.json
  └─ .env.example
 
**Main Routes/Pages**
1. / → Home Page
2. /login → Login Page
3. /signup → Signup Page
4. /products → View all products
5. /services → View all services
6. /cart → Shopping cart
7. /checkout → Checkout page
8. /profile → User profile (buyer/seller)
9. /seller-report → Seller’s sales report
10. /bookings → Buyer/seller bookings

**API Integration**
All API requests are handled using Axios.
API base URL is set via .env in:

**// src/utils/API.js**

    const API = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
* Update REACT_APP_API_URL in .env if backend runs on a different port/server.

**Tech Used**
  React.js
  Bootstrap
  Axios
  React Router
