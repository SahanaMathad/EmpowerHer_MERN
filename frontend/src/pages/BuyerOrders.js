// src/pages/BuyerOrders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BuyerOrders.css";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuyerOrders();
  }, []);

  const fetchBuyerOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/orders/buyer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Buyer Orders Data:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching buyer orders:", error.response?.data || error.message);
    }
  };

  const toggleDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="buyer-orders-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-brief">
              <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
              <p><strong>Total:</strong> ₹{order.totalPrice}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <button 
                className="toggle-btn" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  toggleDetails(order._id); 
                }}>
                {expandedOrders[order._id] ? "Hide Details" : "View Details"}
              </button>
            </div>
            {expandedOrders[order._id] && (
              <div className="order-details">
                {order.shippingDetails && (
                  <div className="shipping-details">
                    <p><strong>Shipping:</strong> {order.shippingDetails.name}</p>
                    <p>
                      {order.shippingDetails.address}, {order.shippingDetails.city} - {order.shippingDetails.zip}
                    </p>
                  </div>
                )}
                {order.items && order.items.length > 0 && (
                  <div className="order-items">
                    <h3>Order Items:</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <p><strong>Product:</strong> {item.product?.name || "Unknown"}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> ₹{(item.product?.price || 0) * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BuyerOrders;
