import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceDetails.css"; // Ensure CSS exists

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState({ date: "", timeSlot: "" });

  // ✅ Fetch Service Details
  useEffect(() => {
    const fetchService = async () => {
      try {
        console.log("📢 Fetching service details for ID:", id);
        const response = await axios.get(`http://localhost:5000/api/services/${id}`);
        console.log("✅ Service Data Received:", response.data);
        setService(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching service:", error.response?.data || error.message);
        setError("⚠️ Service not found or API error!");
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // ✅ Disable past dates in the date picker
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  // ✅ Handle Booking
  const handleBooking = async () => {
    if (!bookingData.date || !bookingData.timeSlot) {
      alert("⚠️ Please select a valid date and time within the seller's availability.");
      return;
    }

    // Check if selected date is within available days
    if (!service.availability.days.includes(new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long' }))) {
      alert("⚠️ Selected date is not within seller's available days.");
      return;
    }

    // Check if selected time is within the provided range
    const [selectedStart, selectedEnd] = bookingData.timeSlot.split(" - ").map(time => new Date(`1970-01-01T${time.replace(/(AM|PM)/, '')}:00`));
    const [availableStart, availableEnd] = service.availability.timeSlots.split(" - ").map(time => new Date(`1970-01-01T${time.replace(/(AM|PM)/, '')}:00`));

    if (selectedStart < availableStart || selectedEnd > availableEnd) {
      alert("⚠️ Selected time slot is outside the seller's available range.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/bookings/book",
        { serviceId: id, date: bookingData.date, timeSlot: bookingData.timeSlot },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Booking Successful:", response.data);
      alert("🎉 Service booked successfully!");
      navigate("/services");
    } catch (error) {
      console.error("❌ Error booking service:", error.response?.data || error.message);
      alert("⚠️ Failed to book service.");
    }
  };

  // ✅ If still loading
  if (loading) return <p>⏳ Loading service details...</p>;

  // ✅ If API error
  if (error) return <p className="error-message">{error}</p>;

  // ✅ If service is still undefined, prevent crash
  if (!service) return <p>⚠️ Service details could not be loaded.</p>;

  return (
    <div className="service-details">
      <h2>{service.name}</h2>
      <p><strong>Location:</strong> {service.location}</p>
      <p><strong>Sub Services:</strong> {service.subServices.join(", ")}</p>
      <p><strong>Availability:</strong> {service.availability.days.join(", ")} ({service.availability.timeSlots})</p>
      <p><strong>Contact:</strong> {service.contact.phone} | {service.contact.email}</p>

      {/* Booking Form */}
      <div className="booking-form">
        <label>Select Date:</label>
        <input
          type="date"
          min={getTodayDate()} // Disable past dates
          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
        />

        <label>Select Time Slot:</label>
        <input
          type="text"
          placeholder={`Available: ${service.availability.timeSlots}`}
          onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
        />

        <button onClick={handleBooking}>📅 Book Service</button>
      </div>
    </div>
  );
};

export default ServiceDetails;
