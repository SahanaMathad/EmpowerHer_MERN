import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerBookings.css"; // Ensure CSS file exists

const SellerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Fetch Seller's Bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/bookings/seller", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🟢 Seller Bookings:", response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
    }
  };

  // ✅ Accept Booking
  const handleAccept = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Booking accepted!");
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error("❌ Error accepting booking:", error);
    }
  };

  // ✅ Reject Booking
  const handleReject = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("❌ Booking rejected!");
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error("❌ Error rejecting booking:", error);
    }
  };

  return (
    <div className="seller-bookings-container">
      <h2>Manage Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h3>{booking.service.name}</h3>
              <p><strong>Buyer:</strong> {booking.buyer.name}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              {booking.status === "Pending" && (
                <div className="booking-actions">
                  <button className="accept-btn" onClick={() => handleAccept(booking._id)}>Accept</button>
                  <button className="reject-btn" onClick={() => handleReject(booking._id)}>Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerBookings;
