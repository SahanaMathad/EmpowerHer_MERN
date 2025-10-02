import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./pages/Profile";
import ProductListing from "./components/ProductListing";
import ServiceListing from "./components/ServiceListing";
import AddProduct from "./components/AddProduct";
import AddService from "./components/AddService";
import ServiceDetails from "./components/ServiceDetails"; 
import Cart from "./components/Cart";
import Reviews from "./components/Reviews";
import ProductDetails from "./pages/ProductDetails"; // ✅ Ensure correct import
import Checkout from "./components/Checkout"
import OrderConfirmation from './components/OrderConfirmation';
import AddedProducts from "./pages/AddedProducts";
import SellerBookings from "./pages/SellerBookings";
import BuyerBookings from "./pages/BuyerBookings";
import SellerOrders from "./pages/SellerOrders"; // ✅ Import
import Payment from "./pages/Payment";
import BuyerOrders from "./pages/BuyerOrders";
import SellerReport from "./components/SellerReport"




const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/services" element={<ServiceListing />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/services" element={<ServiceListing />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/product/:id" element={<ProductDetails />} /> 
        <Route path="/added-products" element={<AddedProducts />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/buyer-bookings" element={<BuyerBookings />} />
        <Route path="/seller-bookings" element={<SellerBookings />} />    
        <Route path="/seller-orders" element={<SellerOrders />} /> {/* ✅ Add this */}
        <Route path="/Checkout" element={<Checkout />} />{/* ✅ Fix Product Details Route */}
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/buyer-orders" element={<BuyerOrders />} />
        <Route path="/seller-report" element={<SellerReport />}/>


      </Routes>
    </>
  );
};

export default App;