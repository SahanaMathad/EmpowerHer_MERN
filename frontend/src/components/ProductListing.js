import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductListing.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Initially, all products are displayed
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Function to handle searching
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredProducts(products); // If search is cleared, show all products
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Product added to cart! 🛒");
      } else {
        alert(`Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="product-listing-container">
      <h1 className="listing-title">🛍️ Explore Our Products</h1>

      {/* 🔍 Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`} className="product-link">
                {/* Image container to prevent cutting */}
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
              </Link>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">₹ {product.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products match your search.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
