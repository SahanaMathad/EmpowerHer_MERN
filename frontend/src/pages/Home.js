import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import women1 from "../assets/pott.jpg";
import women2 from "../assets/1121.PNG";
import women3 from "../assets/1122.PNG";
import women4 from "../assets/paint.jpg";
import women5 from "../assets/garland.jpg";

const images = [women1, women2, women3, women4, women5];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch products from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/carts/add",
        { productId, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("❌ Failed to add product to cart.");
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={images[currentImageIndex]} alt="Women Empowerment" className="hero-image" />
      </div>

      {/* Separate Text Section */}
      <div className="hero-text-section">
        <h1>Empowering Women Entrepreneurs</h1>
        <p>Discover unique handmade products crafted with love.</p>
        <Link to="/products">
          <button className="explore-btn">🛍️ Explore Products</button>
        </Link>
      </div>

      {/* Product Listing */}
      <h1 className="home-title">🛍️ Available Products</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`} className="product-link">
                <img
                  src={product.image.startsWith("http") ? product.image : `http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </Link>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">₹ {product.price}</p>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product._id)}>
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
