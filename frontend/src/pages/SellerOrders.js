import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sellerId, setSellerId] = useState("");

  useEffect(() => {
    fetchSellerId(); // Fetch seller ID first
  }, []);

  // Fetch the seller's ID from the database
  const fetchSellerId = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (data && data._id) {
        setSellerId(data._id);
        fetchSellerOrders(data._id); // Fetch orders after getting the seller ID
      } else {
        console.error("Seller ID not found in database");
      }
    } catch (error) {
      console.error("❌ Error fetching seller ID:", error.response?.data || error.message);
    }
  };

  // Fetch orders for the seller
  const fetchSellerOrders = async () => {
    try {
      const { data: seller } = await axios.get("/api/auth/profile"); // ✅ Fetch logged-in seller
      const sellerId = seller._id; // ✅ Get seller's ID from DB
  
      if (!sellerId) {
        console.error("Seller ID missing from database");
        return;
      }
  
      const response = await axios.get(`/api/orders/seller/${sellerId}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching seller orders:", error);
    }
  };
  
  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("❌ Error updating order status:", error.response?.data || error.message);
    }
  };

  return (
    <div className="seller-orders">
      <h2>Seller Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.items.map((item) => (
                    <p key={item.product._id}>{item.product.name} (x{item.quantity})</p>
                  ))}
                </td>
                <td>${order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Pending" && (
                    <>
                      <button onClick={() => updateOrderStatus(order._id, "Accepted")}>
                        ✅ Accept
                      </button>
                      <button onClick={() => updateOrderStatus(order._id, "Rejected")}>
                        ❌ Reject
                      </button>
                    </>
                  )}
                  {order.status === "Accepted" && (
                    <button onClick={() => updateOrderStatus(order._id, "Shipped")}>🚚 Ship</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SellerOrders;
