import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h1>Available Products</h1>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
        gap: "20px" 
      }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} style={{
              border: "1px solid black", padding: "10px", borderRadius: "10px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", textAlign: "center"
            }}>
              <img src={`http://localhost:5000${product.image}`} alt={product.name} />

              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <button style={{ padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};
const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to the cart!");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
    };

    console.log("Sending request to add product to cart:", cartItem);

    const response = await axios.post("http://localhost:5000/api/carts/add", cartItem, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Product added to cart:", response.data);
    alert("Product added to cart successfully!");

    window.dispatchEvent(new Event("cartUpdated")); // Notify cart page to update
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add product to cart. Check the console for more details.");
  }
};


export default ProductListing;
