import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/bookings/seller", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleAction = async (bookingId, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchBookings();
    } catch (error) {
      console.error(`Error ${action} booking:`, error);
    }
  };

  return (
    <div>
      <h2>Service Booking Requests</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="booking-card">
          <p>Service: {booking.service.name}</p>
          <p>Buyer: {booking.buyer.name}</p>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.timeSlot}</p>
          <p>Status: {booking.status}</p>

          {booking.status === "Pending" && (
            <>
              <button onClick={() => handleAction(booking._id, "accept")}>Accept</button>
              <button onClick={() => handleAction(booking._id, "reject")}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SellerBookings;
