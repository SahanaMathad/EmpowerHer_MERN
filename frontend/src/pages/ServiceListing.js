// frontend/src/pages/ServiceListing.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceListing.css";

const ServiceListing = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/services").then((res) => setServices(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/services/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Service added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="service-listing">
      <h2>Service Listing</h2>
      <form onSubmit={handleSubmit} className="add-service-form">
        <input type="text" name="name" placeholder="Service Name" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <button type="submit">Add Service</button>
      </form>
      <div className="service-container">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListing;
