import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMounted = true;
    console.log(`Fetching product details for ID: ${id}`);

    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (isMounted) {
          console.log("Product details fetched:", res.data);
          setProduct(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id]);

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

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details-container">
      <img src={`http://localhost:5000${product.image}`} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Available Stock:</strong> {product.quantity}</p>

      {/* Quantity Selection */}
      <div className="quantity-container">
        <label htmlFor="quantity">Quantity:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          className="quantity-select"
        >
          {[...Array(product.quantity).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
