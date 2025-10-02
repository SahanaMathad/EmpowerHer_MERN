import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddService.css";

const AddService = () => {
  const [formData, setFormData] = useState({
    name: "",
    subServices: "",
    location: "",
    days: [],
    timeSlots: "",
    phone: "",
    email: "",
    instagram: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      days: checked ? [...prev.days, value] : prev.days.filter((d) => d !== value),
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🟡 Preparing to send service data...");

    if (
      !formData.name ||
      !formData.subServices ||
      !formData.location ||
      !formData.days.length ||
      !formData.timeSlots ||
      !formData.phone ||
      !formData.email ||
      !imageFile
    ) {
      console.error("❌ Missing required fields:", { ...formData, imageFile });
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      data.append("name", formData.name);
      data.append("subServices", JSON.stringify(formData.subServices.split(",").map((s) => s.trim())));
      data.append("location", formData.location);
      data.append("availability", JSON.stringify({ days: formData.days, timeSlots: formData.timeSlots }));
      data.append("contact", JSON.stringify({ phone: formData.phone, email: formData.email, instagram: formData.instagram || "" }));
      data.append("image", imageFile);

      console.log("🔵 Sending Service Data:", Object.fromEntries(data.entries()));

      const response = await axios.post("http://localhost:5000/api/services/add", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Service added successfully:", response.data);
      alert("🎉 Service added successfully!");
      navigate("/services");
    } catch (error) {
      console.error("❌ Error adding service:", error.response?.data || error.message);
      alert(`⚠️ Error adding service: ${error.response?.data?.error || "Check your inputs."}`);
    }
  };

  return (
    <div className="add-service-container">
      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Service Name" onChange={handleChange} required />
        <input type="text" name="subServices" placeholder="Sub Services (comma separated)" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />

        <div className="days-selection">
          <label>Select Available Days:</label>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <label key={day}>
              <input type="checkbox" value={day} onChange={handleDaysChange} />
              {day}
            </label>
          ))}
        </div>

        <input type="text" name="timeSlots" placeholder="Time Slot (e.g. 9:00 AM - 5:00 PM)" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="text" name="instagram" placeholder="Instagram ID (optional)" onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleFileChange} required />

        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
