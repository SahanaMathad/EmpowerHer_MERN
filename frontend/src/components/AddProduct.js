import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      if (imageFile) {
        data.append("image", imageFile);
      } else {
        alert("Please select an image.");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/products/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
