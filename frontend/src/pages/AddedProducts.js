import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get stored token

  useEffect(() => {
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/my-products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load your products.");
      }
    };

    fetchProducts();
  }, [navigate, token]);

  return (
    <div className="container">
      <h2>My Added Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddedProducts;
