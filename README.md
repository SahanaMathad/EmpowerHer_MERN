
**EmpowerHer – MERN Stack Project**

EmpowerHer is a digital platform designed to empower rural housewives by giving them a marketplace to sell handmade products and offer reliable services.
It bridges the gap between rural sellers and urban buyers, helping women achieve financial independence, cultural preservation, and entrepreneurship.

**Features**

1. Product Listings – Handmade goods (pottery, embroidery, snacks, etc.)
2. Service Listings – Tailoring, tutoring, handicrafts, and more.
3. Location-based Access – Connect with nearby service providers.
4. Order & Cart Management – Smooth shopping and service booking.
5. Secure Payments – Hassle-free transactions.
6. Review System – Build trust with product/service feedback.
7. Reports for Sellers – Generate sales reports and track business growth.

**Tech Stack**
Frontend: React.js, Bootstrap, CSS, JavaScript.
Backend: Node.js, Express.js.
Database: MongoDB.
Environment: .env files for secrets.

**Project Structure**
EmpowerHer_MERN/
├─ backend/       # Node.js + Express + MongoDB APIs
├─ frontend/      # React frontend
├─ docker-compose.yml
├─ .gitignore
├─ README.md

**Installation & Setup**
1. Clone the Repository
  git clone https://github.com/SahanaMathad/EmpowerHer_MERN.git
  cd EmpowerHer_MERN
2. Backend Setup
  cd backend
  npm install
  cp .env.example .env   # update values inside
  npm start
3. Frontend
  cd ../frontend
  npm install
  cp .env.example .env   # update API URL if needed
  npm start
4. Open App
  Frontend: http://localhost:3000
  Backend API: http://localhost:5000/api

**Database Schema**

1. Users → name, email, phone, role (buyer/seller), password.
2. Products → title, description, price, stock, seller info.
3. Services → type, description, price, location, provider info.
4. Orders → buyer, seller, product/service, payment status.
5. Reviews → feedback on products & services.
6. Reports → seller performance, sales history, and earnings.

**Screenshots**
### Signup Page
![Signup Page](./screenshots/102.png)

### Login Page
![Login Page](./screenshots/101.png)

### About Page
![About Page](./screenshots/113.png)

### Seller Profile Page
![Seller Profile Page](./screenshots/103.png)

### Add Product Page
![Add product Page](./screenshots/104.png)

### Add Service Page
![Add service Page](./screenshots/105.png)

### Manage Service Page
![Manage service Page](./screenshots/106.png)

### Product Listing Page
![Product listing Page](./screenshots/107.png)

### Cart Page
![Cart Page](./screenshots/109.png)

### Payment Page
![Payment Page](./screenshots/110.png)

### Service listing Page
![Service Listing Page](./screenshots/111.png)

### Add Service Page
![Add Service Page](./screenshots/112.png)


**Contributing**

1. Fork the repo.
2. Create a feature branch (git checkout -b feature/new-feature).
3. Commit changes (git commit -m "Add new feature").
4. Push to branch (git push origin feature/new-feature).
5. Open a Pull Request.
