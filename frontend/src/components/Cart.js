// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Cart.css"; // Ensure this CSS file exists

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCart();

//     const handleCartUpdate = () => fetchCart();
//     window.addEventListener("cartUpdated", handleCartUpdate);

//     return () => {
//       window.removeEventListener("cartUpdated", handleCartUpdate);
//     };
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/carts", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Cart Data:", response.data); // Debugging

//       setCart(response.data);
//       calculateTotal(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching cart:", error);
//     }
//   };

//   const calculateTotal = (items) => {
//     const total = items.reduce(
//       (acc, item) => acc + item.product.price * item.quantity,
//       0
//     );
//     setTotalPrice(total);
//   };

//   const handleQuantityChange = async (itemId, newQuantity) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5000/api/carts/update/${itemId}`,
//         { quantity: newQuantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       fetchCart();
//     } catch (error) {
//       console.error("❌ Error updating quantity:", error);
//     }
//   };

//   const handleRemoveFromCart = async (itemId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/carts/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert("Item removed from cart!");
//       fetchCart();
//     } catch (error) {
//       console.error("Error removing item:", error);
//       alert("Failed to remove item from cart.");
//     }
//   };

//   const handleProceedToCheckout = () => {
//     if (cart.length === 0) {
//       alert("⚠️ Your cart is empty! Add items before checking out.");
//       return;
//     }
//     navigate("/checkout");
//   };

//   return (
//     <div className="cart-container">
//       <h1>Your Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p className="empty-cart">🛍️ Your cart is empty.</p>
//       ) : (
//         <div className="cart-items">
//           {cart.map((item) => (
//             <div key={item._id} className="cart-item">
//               {/* ✅ Debugging Image Display */}
//               {console.log("Product Data:", item.product)}

//               {/* ✅ Image Display Fix */}
//               <img
//   src={`http://localhost:5000${item.product.image}`} // ✅ Corrected string interpolation
//   alt={item.product.name}
//   className="cart-item-image"
// />

//               <div className="cart-item-details">
//                 <h3>{item.product.name}</h3>
//                 <p className="cart-price">
//                   Price: <strong>₹{item.product.price}</strong>
//                 </p>

//                 <div className="quantity-selector">
//                   <label>Qty:</label>
//                   <select
//                     value={item.quantity}
//                     onChange={(e) =>
//                       handleQuantityChange(item._id, parseInt(e.target.value, 10))
//                     }
//                   >
//                     {[...Array(10).keys()].map((num) => (
//                       <option key={num + 1} value={num + 1}>
//                         {num + 1}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button className="remove-btn" onClick={() => handleRemoveFromCart(item._id)}>
//                   ❌ Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="cart-summary">
//             <h2>
//               Total Price: <strong>₹{totalPrice.toFixed(2)}</strong>
//             </h2>
//             <button className="checkout-btn" onClick={handleProceedToCheckout}>
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Ensure this CSS file exists

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();

    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/carts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Cart Data:", response.data); // Debugging

      setCart(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  };

  const calculateTotal = (items) => {
    const GST_PER_PRODUCT = 50; // Fixed GST amount per product
    const total = items.reduce(
      (acc, item) => acc + (item.product.price + GST_PER_PRODUCT) * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/carts/update/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart();
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/carts/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Item removed from cart!");
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert("⚠️ Your cart is empty! Add items before checking out.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">🛍️ Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              {/* ✅ Debugging Image Display */}
              {console.log("Product Data:", item.product)}

              {/* ✅ Image Display Fix */}
              <img
                src={`http://localhost:5000${item.product.image}`} // ✅ Corrected string interpolation
                alt={item.product.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p className="cart-price">
                  Price: <strong>₹{item.product.price}</strong>
                </p>

                <div className="quantity-selector">
                  <label>Qty:</label>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value, 10))
                    }
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="remove-btn" onClick={() => handleRemoveFromCart(item._id)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>
              Total Price (incl. GST): <strong>₹{totalPrice.toFixed(2)}</strong>
            </h2>
            <button className="checkout-btn" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
