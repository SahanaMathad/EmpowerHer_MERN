import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Import user icon
import axios from "axios";
import "./Navbar.css"; // Ensure the updated CSS is linked

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ✅ Handle Search
  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const [productRes, serviceRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/products/search?query=${query}`),
        axios.get(`http://localhost:5000/api/services/search?query=${query}`)
      ]);

      setSearchResults([...productRes.data, ...serviceRes.data]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // ✅ Navigate to Selected Item
  const handleSelectItem = (item) => {
    if (item.price) {
      navigate(`/product/${item._id}`); // Navigate to product details
    } else {
      navigate(`/services`); // Navigate to services
    }
    setSearchQuery(""); // Clear search input after selection
    setSearchResults([]); // Clear results dropdown
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">EmpowerHer</Link>

      {/* 📌 Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/services">Services</Link>

        {token ? (
          <>
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <Link to="/profile">👤</Link>
            
            {/* 🆕 Profile Tab */}
           
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        
      </div>
    </nav>
  );
};

export default Navbar;
