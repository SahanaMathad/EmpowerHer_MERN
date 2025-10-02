// frontend/src/pages/Payment.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css"; // Add some styling

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Suppose you passed orderId & totalPrice via location.state
  const { orderId, totalPrice } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }
    if (!orderId || !totalPrice) {
      alert("No order details found!");
      navigate("/");
    }
  }, [token, orderId, totalPrice, navigate]);

  const handlePayment = async () => {
    if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all card details!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments",
        {
          orderId,
          amount: totalPrice, // from your location.state
          paymentMethod,
          cardHolderName,
          cardNumber,
          expiryDate,
          cvv,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.payment) {
        alert("Payment successful!");
        // Optionally, redirect to an Order Confirmation or Home
        navigate("/"); 
      } else {
        alert("Payment not completed. Check logs.");
      }
    } catch (error) {
      console.error("❌ Error creating payment:", error.response?.data || error);
      alert("Failed to process payment. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Secure Payment</h2>
      <div className="payment-summary">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Amount:</strong> ₹{totalPrice}</p>
      </div>

      <div className="payment-method">
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Card">Credit/Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="COD">Cash on Delivery</option>
        </select>
      </div>

      {paymentMethod === "Card" && (
        <div className="card-details">
          <label>Card Holder Name</label>
          <input
            type="text"
            placeholder="Name on card"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
          />

          <label>Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9123 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <label>Expiry Date (MM/YY)</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />

          <label>CVV</label>
          <input
            type="password"
            placeholder="***"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
      )}

      {/* If you choose UPI or COD, you can show different fields accordingly */}

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
