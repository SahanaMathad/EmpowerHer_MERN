import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css"; // Ensure this CSS file exists for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    category: "",
    phone: "",
    state: "",
    city: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("✅ Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("❌ Signup Error:", error);
      alert("⚠️ Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">🔹 Create Your Account</h2>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <input type="email" placeholder="Email Address" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="password" placeholder="Create Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          <input type="text" placeholder="Phone Number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <input type="text" placeholder="State" onChange={(e) => setFormData({ ...formData, state: e.target.value })} required />
          <input type="text" placeholder="City" onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />

          <div className="dropdown-container">
            <select onChange={(e) => setFormData({ ...formData, role: e.target.value })} required>
              <option value="">Select Role</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>

            <select onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
              <option value="">Select Category</option>
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-redirect">Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
      </div>
    </div>
  );
};

export default Signup;
