import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductGrid.css";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={`http://localhost:5000${product.image}`} alt={product.name} />

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">₹{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductGrid;
