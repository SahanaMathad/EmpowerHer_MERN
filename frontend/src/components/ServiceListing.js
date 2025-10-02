import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ServiceListing.css"; // Ensure this CSS exists

const ServiceListing = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredServices, setFilteredServices] = useState([]); // Filtered service list
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Fetch Services
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      console.log("🟢 Services Fetched:", response.data); // Debugging API response
      setServices(response.data);
      setFilteredServices(response.data); // Initially show all services
    } catch (error) {
      console.error("❌ Error fetching services:", error.response?.data || error.message);
    }
  };

  // ✅ Handle Search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredServices(services); // If search is cleared, show all services
    } else {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(query) ||
        service.location.toLowerCase().includes(query) ||
        service.subServices.some(sub => sub.toLowerCase().includes(query)) // Check sub-services
      );
      setFilteredServices(filtered);
    }
  };

  // ✅ Navigate to Booking Page
  const handleBookService = (serviceId) => {
    navigate(`/service/${serviceId}`); // Redirect to ServiceDetails page
  };

  return (
    <div className="service-listing-container">
    <h1 className="listing-title"> Available Services</h1>


      {/* 🔍 Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search services by name, location, or category..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {filteredServices.length === 0 ? (
        <p className="no-services">No services match your search.</p>
      ) : (
        <div className="service-grid">
          {filteredServices.map((service) => (
            <div key={service._id} className="service-card">
              <img
                src={`http://localhost:5000${service.image}`}
                alt={service.name}
                className="service-image"
              />
              <h3>{service.name}</h3>
              <p><strong>📍 Location:</strong> {service.location}</p>
              <p><strong> Sub Services:</strong> {service.subServices.join(", ")}</p>
              <p><strong>Availability:</strong> {service.availability.days.join(", ")} ({service.availability.timeSlots})</p>
              <p><strong>Contact:</strong> {service.contact.phone} | {service.contact.email}</p>

              {/* ✅ Book Service Button */}
              <button className="book-service-btn" onClick={() => handleBookService(service._id)}>
                 Book Service
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceListing;
