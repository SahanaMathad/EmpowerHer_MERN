import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CartIcon.css";

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
    window.addEventListener("cartUpdated", fetchCartCount);
    return () => window.removeEventListener("cartUpdated", fetchCartCount);
  }, []);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(response.data.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  return (
    <Link to="/cart" className="cart-icon">
      🛒 <span className="cart-count">{cartCount}</span>
    </Link>
  );
};

export default CartIcon;
