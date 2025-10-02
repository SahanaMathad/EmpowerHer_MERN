// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import axios from "axios";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import "./Checkout.css"; // Ensure CSS file exists

// // // // // // // // const Checkout = () => {
// // // // // // // //   const [cart, setCart] = useState([]);
// // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // //   const [shippingDetails, setShippingDetails] = useState({
// // // // // // // //     name: "",
// // // // // // // //     address: "",
// // // // // // // //     city: "",
// // // // // // // //     zip: "",
// // // // // // // //   });
// // // // // // // //   const [paymentMethod, setPaymentMethod] = useState("cod"); 
// // // // // // // //   const [paymentDetails, setPaymentDetails] = useState({
// // // // // // // //     upiId: "",
// // // // // // // //     cardNumber: "",
// // // // // // // //     expiry: "",
// // // // // // // //     cvv: "",
// // // // // // // //   });

// // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // //   const [orderId, setOrderId] = useState(null);
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchCart();
// // // // // // // //   }, []);

// // // // // // // //   const fetchCart = async () => {
// // // // // // // //     try {
// // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // //       const response = await axios.get("http://localhost:5000/api/carts", {
// // // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // // //       });
// // // // // // // //       console.log("🟢 Cart Data:", response.data);
// // // // // // // //       setCart(response.data);
// // // // // // // //       calculateTotal(response.data);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Error fetching cart:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const calculateTotal = (items) => {
// // // // // // // //     const total = items.reduce(
// // // // // // // //       (acc, item) => acc + (item.product?.price || 0) * item.quantity,
// // // // // // // //       0
// // // // // // // //     );
// // // // // // // //     setTotalPrice(total);
// // // // // // // //   };

// // // // // // // //   const handleInputChange = (e) => {
// // // // // // // //     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
// // // // // // // //   };

// // // // // // // //   const handlePaymentDetailsChange = (e) => {
// // // // // // // //     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
// // // // // // // //   };

// // // // // // // //   const handlePaymentMethodChange = (e) => {
// // // // // // // //     setPaymentMethod(e.target.value);
// // // // // // // //   };

// // // // // // // //   const handlePlaceOrder = async () => {
// // // // // // // //     // Basic validation
// // // // // // // //     if (
// // // // // // // //       !shippingDetails.name ||
// // // // // // // //       !shippingDetails.address ||
// // // // // // // //       !shippingDetails.city ||
// // // // // // // //       !shippingDetails.zip
// // // // // // // //     ) {
// // // // // // // //       alert("⚠️ Please fill in all shipping details.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     // Optional payment method checks
// // // // // // // //     if (paymentMethod === "upi" && !paymentDetails.upiId.trim()) {
// // // // // // // //       alert("⚠️ Please enter your UPI ID.");
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (paymentMethod === "card") {
// // // // // // // //       if (
// // // // // // // //         !paymentDetails.cardNumber.trim() ||
// // // // // // // //         !paymentDetails.expiry.trim() ||
// // // // // // // //         !paymentDetails.cvv.trim()
// // // // // // // //       ) {
// // // // // // // //         alert("⚠️ Please fill in all card details.");
// // // // // // // //         return;
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     setLoading(true);
// // // // // // // //     try {
// // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // //       const orderData = { 
// // // // // // // //         cartItems: cart, 
// // // // // // // //         totalPrice, 
// // // // // // // //         shippingDetails 
// // // // // // // //       };

// // // // // // // //       console.log("🟢 Sending Order Data to /api/orders:", orderData);

// // // // // // // //       const response = await axios.post(
// // // // // // // //         "http://localhost:5000/api/orders",
// // // // // // // //         orderData,
// // // // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // // // //       );

// // // // // // // //       console.log("🟢 Order API Response:", response.data);

// // // // // // // //       if (response.data && response.data.order && response.data.order._id) {
// // // // // // // //         setOrderId(response.data.order._id);
// // // // // // // //         alert("🎉 Order placed successfully!");

// // // // // // // //         // Clear cart in local state
// // // // // // // //         setCart([]);
// // // // // // // //         setTotalPrice(0);

// // // // // // // //         // Optionally redirect
// // // // // // // //         setTimeout(() => {
// // // // // // // //           navigate("/");
// // // // // // // //         }, 2000);
// // // // // // // //       } else {
// // // // // // // //         console.error("❌ Order ID is missing in response:", response.data);
// // // // // // // //         alert("⚠️ Order was not placed successfully. Try again.");
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Error placing order:", error.response?.data || error);
// // // // // // // //       alert("⚠️ Failed to place order. Try again.");
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="checkout-container">
// // // // // // // //       <h1>Checkout</h1>

// // // // // // // //       {orderId ? (
// // // // // // // //         <div className="order-success">
// // // // // // // //           <h2>🎉 Order Placed Successfully!</h2>
// // // // // // // //           <p>Your order ID: <strong>{orderId}</strong></p>
// // // // // // // //           <p>Thank you for shopping with us!</p>
// // // // // // // //           <button onClick={() => navigate("/")}>Go to Home</button>
// // // // // // // //         </div>
// // // // // // // //       ) : (
// // // // // // // //         <>
// // // // // // // //           <div className="order-summary">
// // // // // // // //             <h2>Order Summary</h2>
// // // // // // // //             {cart.length > 0 ? (
// // // // // // // //               cart.map((item) => (
// // // // // // // //                 <div key={item._id} className="checkout-item">
// // // // // // // //                   <img
// // // // // // // //                     src={
// // // // // // // //                       item.product?.image
// // // // // // // //                         ? `http://localhost:5000${item.product.image}`
// // // // // // // //                         : "https://via.placeholder.com/150"
// // // // // // // //                     }
// // // // // // // //                     alt={item.product?.name || "No name"}
// // // // // // // //                     className="cart-item-image"
// // // // // // // //                   />
// // // // // // // //                   <div>
// // // // // // // //                     <h3>{item.product?.name}</h3>
// // // // // // // //                     <p>Quantity: {item.quantity}</p>
// // // // // // // //                     <p>Price: ₹{(item.product?.price || 0) * item.quantity}</p>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               ))
// // // // // // // //             ) : (
// // // // // // // //               <p>🛒 Your cart is empty.</p>
// // // // // // // //             )}
// // // // // // // //             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
// // // // // // // //           </div>

// // // // // // // //           <div className="shipping-details">
// // // // // // // //             <h2>Shipping Address</h2>
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               name="name"
// // // // // // // //               placeholder="Full Name"
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               name="address"
// // // // // // // //               placeholder="Address"
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               name="city"
// // // // // // // //               placeholder="City"
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               name="zip"
// // // // // // // //               placeholder="ZIP Code"
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //           </div>

// // // // // // // //           <div className="payment-section">
// // // // // // // //             <h2>Payment Method</h2>
// // // // // // // //             <select value={paymentMethod} onChange={handlePaymentMethodChange}>
// // // // // // // //               <option value="cod">Cash on Delivery (COD)</option>
// // // // // // // //               <option value="upi">UPI</option>
// // // // // // // //               <option value="card">Card</option>
// // // // // // // //             </select>

// // // // // // // //             {paymentMethod === "upi" && (
// // // // // // // //               <div className="upi-details">
// // // // // // // //                 <label>UPI ID:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   name="upiId"
// // // // // // // //                   placeholder="e.g. yourname@bank"
// // // // // // // //                   value={paymentDetails.upiId}
// // // // // // // //                   onChange={handlePaymentDetailsChange}
// // // // // // // //                 />
// // // // // // // //               </div>
// // // // // // // //             )}

// // // // // // // //             {paymentMethod === "card" && (
// // // // // // // //               <div className="card-details">
// // // // // // // //                 <label>Card Number:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   name="cardNumber"
// // // // // // // //                   placeholder="#### #### #### ####"
// // // // // // // //                   value={paymentDetails.cardNumber}
// // // // // // // //                   onChange={handlePaymentDetailsChange}
// // // // // // // //                 />

// // // // // // // //                 <label>Expiry Date:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   name="expiry"
// // // // // // // //                   placeholder="MM/YY"
// // // // // // // //                   value={paymentDetails.expiry}
// // // // // // // //                   onChange={handlePaymentDetailsChange}
// // // // // // // //                 />

// // // // // // // //                 <label>CVV:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   name="cvv"
// // // // // // // //                   placeholder="123"
// // // // // // // //                   value={paymentDetails.cvv}
// // // // // // // //                   onChange={handlePaymentDetailsChange}
// // // // // // // //                 />
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </div>

// // // // // // // //           <button
// // // // // // // //             className="place-order-btn"
// // // // // // // //             onClick={handlePlaceOrder}
// // // // // // // //             disabled={loading}
// // // // // // // //           >
// // // // // // // //             {loading ? "Processing Order..." : "Place Order"}
// // // // // // // //           </button>
// // // // // // // //         </>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Checkout;
// // // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // // import axios from "axios";
// // // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // // import "./Checkout.css"; // Ensure CSS file exists

// // // // // // // // const Checkout = () => {
// // // // // // // //   const [cart, setCart] = useState([]);
// // // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // // //   const [shippingDetails, setShippingDetails] = useState({
// // // // // // // //     name: "",
// // // // // // // //     address: "",
// // // // // // // //     city: "",
// // // // // // // //     zip: "",
// // // // // // // //   });
// // // // // // // //   const [paymentMethod, setPaymentMethod] = useState("cod");
// // // // // // // //   const [paymentDetails, setPaymentDetails] = useState({
// // // // // // // //     upiId: "",
// // // // // // // //     cardNumber: "",
// // // // // // // //     expiry: "",
// // // // // // // //     cvv: "",
// // // // // // // //   });

// // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // //   const [orderId, setOrderId] = useState(null);
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchCart();
// // // // // // // //   }, []);

// // // // // // // //   const fetchCart = async () => {
// // // // // // // //     try {
// // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // //       const response = await axios.get("http://localhost:5000/api/carts", {
// // // // // // // //         headers: { Authorization: `Bearer ${token}` }, // Fix: Add backticks here
// // // // // // // //       });
// // // // // // // //       console.log("🟢 Cart Data:", response.data);
// // // // // // // //       setCart(response.data);
// // // // // // // //       calculateTotal(response.data);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Error fetching cart:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const calculateTotal = (items) => {
// // // // // // // //     const total = items.reduce(
// // // // // // // //       (acc, item) => acc + (item.product?.price || 0) * item.quantity,
// // // // // // // //       0
// // // // // // // //     );
// // // // // // // //     setTotalPrice(total);
// // // // // // // //   };

// // // // // // // //   const handleInputChange = (e) => {
// // // // // // // //     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
// // // // // // // //   };

// // // // // // // //   const handlePaymentDetailsChange = (e) => {
// // // // // // // //     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
// // // // // // // //   };

// // // // // // // //   const handlePaymentMethodChange = (e) => {
// // // // // // // //     setPaymentMethod(e.target.value);
// // // // // // // //   };

// // // // // // // //   const handlePlaceOrder = async () => {
// // // // // // // //     // Check if any cart item exceeds the available stock
// // // // // // // //     for (let item of cart) {
// // // // // // // //       if (item.quantity > item.product?.stock) {
// // // // // // // //         alert(`⚠️ Insufficient stock for ${item.product.name}. Maximum available: ${item.product.stock}`);
// // // // // // // //         return;
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     // Basic validation for shipping details
// // // // // // // //     if (
// // // // // // // //       !shippingDetails.name ||
// // // // // // // //       !shippingDetails.address ||
// // // // // // // //       !shippingDetails.city ||
// // // // // // // //       !shippingDetails.zip
// // // // // // // //     ) {
// // // // // // // //       alert("⚠️ Please fill in all shipping details.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     // Validation for payment details
// // // // // // // //     if (paymentMethod === "upi" && !paymentDetails.upiId.trim()) {
// // // // // // // //       alert("⚠️ Please enter your UPI ID.");
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     if (paymentMethod === "card") {
// // // // // // // //       if (
// // // // // // // //         !paymentDetails.cardNumber.trim() ||
// // // // // // // //         !paymentDetails.expiry.trim() ||
// // // // // // // //         !paymentDetails.cvv.trim()
// // // // // // // //       ) {
// // // // // // // //         alert("⚠️ Please fill in all card details.");
// // // // // // // //         return;
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     setLoading(true);
// // // // // // // //     try {
// // // // // // // //       const token = localStorage.getItem("token");
// // // // // // // //       const orderData = {
// // // // // // // //         cartItems: cart,
// // // // // // // //         totalPrice,
// // // // // // // //         shippingDetails,
// // // // // // // //       };

// // // // // // // //       console.log("🟢 Sending Order Data to /api/orders:", orderData);

// // // // // // // //       const response = await axios.post(
// // // // // // // //         "http://localhost:5000/api/orders",
// // // // // // // //         orderData,
// // // // // // // //         { headers: { Authorization: `Bearer ${token}` } } // Fix: Add backticks here
// // // // // // // //       );

// // // // // // // //       console.log("🟢 Order API Response:", response.data);

// // // // // // // //       if (response.data && response.data.order && response.data.order._id) {
// // // // // // // //         setOrderId(response.data.order._id);
// // // // // // // //         alert("🎉 Order placed successfully!");

// // // // // // // //         // Clear cart in local state
// // // // // // // //         setCart([]);
// // // // // // // //         setTotalPrice(0);

// // // // // // // //         // Optionally redirect
// // // // // // // //         setTimeout(() => {
// // // // // // // //           navigate("/");
// // // // // // // //         }, 2000);
// // // // // // // //       } else {
// // // // // // // //         console.error("❌ Order ID is missing in response:", response.data);
// // // // // // // //         alert("⚠️ Order was not placed successfully. Try again.");
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("❌ Error placing order:", error.response?.data || error);
// // // // // // // //       alert("⚠️ Failed to place order. Try again.");
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="checkout-container">
// // // // // // // //       <h1>Checkout</h1>

// // // // // // // //       {orderId ? (
// // // // // // // //         <div className="order-success">
// // // // // // // //           <h2>🎉 Order Placed Successfully!</h2>
// // // // // // // //           <p>Your order ID: <strong>{orderId}</strong></p>
// // // // // // // //           <p>Thank you for shopping with us!</p>
// // // // // // // //           <button onClick={() => navigate("/")}>Go to Home</button>
// // // // // // // //         </div>
// // // // // // // //       ) : (
// // // // // // // //         <>
// // // // // // // //           <div className="order-summary">
// // // // // // // //             <h2>Order Summary</h2>
// // // // // // // //             {cart.length > 0 ? (
// // // // // // // //               cart.map((item) => {
// // // // // // // //                 const product = item.product;
// // // // // // // //                 if (!product) return null;

// // // // // // // //                 return (
// // // // // // // //                   <div key={item._id} className="checkout-item">
// // // // // // // //                     <img
// // // // // // // //                       src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/150"}
// // // // // // // //                       alt={product.name || "No name"}
// // // // // // // //                       className="cart-item-image"
// // // // // // // //                     />
// // // // // // // //                     <div>
// // // // // // // //                       <h3>{product.name || "Unnamed Product"}</h3>
// // // // // // // //                       <p>Quantity: {item.quantity}</p>
// // // // // // // //                       <p>Price: ₹{(product.price || 0) * item.quantity}</p>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 );
// // // // // // // //               })
// // // // // // // //             ) : (
// // // // // // // //               <p>🛒 Your cart is empty.</p>
// // // // // // // //             )}
// // // // // // // //             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
// // // // // // // //           </div>

// // // // // // // //           <div className="shipping-details">
// // // // // // // //             <h2>Shipping Address</h2>
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               name="name"
// // // // // // // //               placeholder="Full Name"
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               name="address"
// // // // // // // //               placeholder="Address"
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               name="city"
// // // // // // // //               placeholder="City"
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <input
// // // // // // // //               type="text"
// // // // // // // //               name="zip"
// // // // // // // //               placeholder="ZIP Code"
// // // // // // // //               onChange={handleInputChange}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //           </div>

// // // // // // // //           <div className="payment-section">
// // // // // // // //             <h2>Payment Method</h2>
// // // // // // // //             <select value={paymentMethod} onChange={handlePaymentMethodChange}>
// // // // // // // //               <option value="cod">Cash on Delivery (COD)</option>
// // // // // // // //               <option value="upi">UPI</option>
// // // // // // // //               <option value="card">Card</option>
// // // // // // // //             </select>

// // // // // // // //             {paymentMethod === "upi" && (
// // // // // // // //               <div className="upi-details">
// // // // // // // //                 <label>UPI ID:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   name="upiId"
// // // // // // // //                   placeholder="e.g. yourname@bank"
// // // // // // // //                   value={paymentDetails.upiId}
// // // // // // // //                   onChange={handlePaymentDetailsChange}
// // // // // // // //                 />
// // // // // // // //               </div>
// // // // // // // //             )}

// // // // // // // //             {paymentMethod === "card" && (
// // // // // // // //               <div className="card-details">
// // // // // // // //                 <label>Card Number:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   name="cardNumber"
// // // // // // // //                   placeholder="#### #### #### ####"
// // // // // // // //                   value={paymentDetails.cardNumber}
// // // // // // // //                   onChange={handlePaymentDetailsChange}
// // // // // // // //                 />

// // // // // // // //                 <label>Expiry Date:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   name="expiry"
// // // // // // // //                   placeholder="MM/YY"
// // // // // // // //                   value={paymentDetails.expiry}
// // // // // // // //                   onChange={handlePaymentDetailsChange}
// // // // // // // //                 />

// // // // // // // //                 <label>CVV:</label>
// // // // // // // //                 <input
// // // // // // // //                   type="text"
// // // // // // // //                   name="cvv"
// // // // // // // //                   placeholder="123"
// // // // // // // //                   value={paymentDetails.cvv}
// // // // // // // //                   onChange={handlePaymentDetailsChange}
// // // // // // // //                 />
// // // // // // // //               </div>
// // // // // // // //             )}
// // // // // // // //           </div>

// // // // // // // //           <button
// // // // // // // //             className="place-order-btn"
// // // // // // // //             onClick={handlePlaceOrder}
// // // // // // // //             disabled={loading}
// // // // // // // //           >
// // // // // // // //             {loading ? "Processing Order..." : "Place Order"}
// // // // // // // //           </button>
// // // // // // // //         </>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Checkout;
// // // // // // // import React, { useEffect, useState } from "react";
// // // // // // // import axios from "axios";
// // // // // // // import { useNavigate } from "react-router-dom";
// // // // // // // import "./Checkout.css";

// // // // // // // const Checkout = () => {
// // // // // // //   const [cart, setCart] = useState([]);
// // // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // // //   const [shippingDetails, setShippingDetails] = useState({
// // // // // // //     name: "",
// // // // // // //     address: "",
// // // // // // //     city: "",
// // // // // // //     zip: "",
// // // // // // //   });
// // // // // // //   const [paymentMethod, setPaymentMethod] = useState("cod");
// // // // // // //   const [paymentDetails, setPaymentDetails] = useState({
// // // // // // //     upiId: "",
// // // // // // //     cardNumber: "",
// // // // // // //     expiry: "",
// // // // // // //     cvv: "",
// // // // // // //   });
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [orderId, setOrderId] = useState(null);
// // // // // // //   const navigate = useNavigate();

// // // // // // //   useEffect(() => {
// // // // // // //     fetchCart();
// // // // // // //   }, []);

// // // // // // //   const fetchCart = async () => {
// // // // // // //     try {
// // // // // // //       const token = localStorage.getItem("token");
// // // // // // //       const response = await axios.get("http://localhost:5000/api/carts", {
// // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // //       });
// // // // // // //       setCart(response.data);
// // // // // // //       calculateTotal(response.data);
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Error fetching cart:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const calculateTotal = (items) => {
// // // // // // //     const total = items.reduce(
// // // // // // //       (acc, item) => acc + (item.product?.price || 0) * item.quantity,
// // // // // // //       0
// // // // // // //     );
// // // // // // //     setTotalPrice(total);
// // // // // // //   };

// // // // // // //   const handleInputChange = (e) => {
// // // // // // //     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
// // // // // // //   };

// // // // // // //   const handlePaymentDetailsChange = (e) => {
// // // // // // //     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
// // // // // // //   };

// // // // // // //   const handlePaymentMethodChange = (e) => {
// // // // // // //     setPaymentMethod(e.target.value);
// // // // // // //   };

// // // // // // //   const handlePlaceOrder = async () => {
// // // // // // //     for (let item of cart) {
// // // // // // //       if (!item.product) {
// // // // // // //         alert("⚠️ One or more items in your cart are invalid.");
// // // // // // //         return;
// // // // // // //       }
// // // // // // //       if (item.quantity > item.product.stock) {
// // // // // // //         alert(`⚠️ Insufficient stock for ${item.product.name}. Maximum available: ${item.product.stock}`);
// // // // // // //         return;
// // // // // // //       }
// // // // // // //     }

// // // // // // //     if (
// // // // // // //       !shippingDetails.name ||
// // // // // // //       !shippingDetails.address ||
// // // // // // //       !shippingDetails.city ||
// // // // // // //       !shippingDetails.zip
// // // // // // //     ) {
// // // // // // //       alert("⚠️ Please fill in all shipping details.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (paymentMethod === "upi" && !paymentDetails.upiId.trim()) {
// // // // // // //       alert("⚠️ Please enter your UPI ID.");
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     if (paymentMethod === "card") {
// // // // // // //       if (
// // // // // // //         !paymentDetails.cardNumber.trim() ||
// // // // // // //         !paymentDetails.expiry.trim() ||
// // // // // // //         !paymentDetails.cvv.trim()
// // // // // // //       ) {
// // // // // // //         alert("⚠️ Please fill in all card details.");
// // // // // // //         return;
// // // // // // //       }
// // // // // // //     }

// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const token = localStorage.getItem("token");

// // // // // // //       const orderData = {
// // // // // // //         cartItems: cart
// // // // // // //           .filter((item) => item.product)
// // // // // // //           .map((item) => ({
// // // // // // //             product: item.product._id,
// // // // // // //             quantity: item.quantity,
// // // // // // //             price: item.product.price,
// // // // // // //           })),
// // // // // // //         totalPrice,
// // // // // // //         shippingDetails,
// // // // // // //         paymentMethod,
// // // // // // //         paymentDetails,
// // // // // // //       };

// // // // // // //       const response = await axios.post(
// // // // // // //         "http://localhost:5000/api/orders",
// // // // // // //         orderData,
// // // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // // //       );

// // // // // // //       if (response.data && response.data.order && response.data.order._id) {
// // // // // // //         setOrderId(response.data.order._id);
// // // // // // //         alert("🎉 Order placed successfully!");

// // // // // // //         setCart([]);
// // // // // // //         setTotalPrice(0);
// // // // // // //         localStorage.removeItem("cartItems");

// // // // // // //         setTimeout(() => {
// // // // // // //           navigate("/");
// // // // // // //         }, 2000);
// // // // // // //       } else {
// // // // // // //         alert("⚠️ Order was not placed successfully. Try again.");
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error("❌ Error placing order:", error.response?.data || error);
// // // // // // //       alert("⚠️ Failed to place order. Try again.");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="checkout-container">
// // // // // // //       <h1>Checkout</h1>

// // // // // // //       {orderId ? (
// // // // // // //         <div className="order-success">
// // // // // // //           <h2>🎉 Order Placed Successfully!</h2>
// // // // // // //           <p>Your order ID: <strong>{orderId}</strong></p>
// // // // // // //           <button onClick={() => navigate("/")}>Go to Home</button>
// // // // // // //         </div>
// // // // // // //       ) : (
// // // // // // //         <>
// // // // // // //           <div className="order-summary">
// // // // // // //             <h2>Order Summary</h2>
// // // // // // //             {cart.length > 0 ? (
// // // // // // //               cart.map((item) => {
// // // // // // //                 const product = item.product;
// // // // // // //                 if (!product) return null;
// // // // // // //                 return (
// // // // // // //                   <div key={item._id} className="checkout-item">
// // // // // // //                     <img
// // // // // // //                       src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/150"}
// // // // // // //                       alt={product.name || "No name"}
// // // // // // //                       className="cart-item-image"
// // // // // // //                     />
// // // // // // //                     <div>
// // // // // // //                       <h3>{product.name || "Unnamed Product"}</h3>
// // // // // // //                       <p>Quantity: {item.quantity}</p>
// // // // // // //                       <p>Price: ₹{(product.price || 0) * item.quantity}</p>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 );
// // // // // // //               })
// // // // // // //             ) : (
// // // // // // //               <p>🛒 Your cart is empty.</p>
// // // // // // //             )}
// // // // // // //             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
// // // // // // //           </div>

// // // // // // //           <div className="shipping-details">
// // // // // // //             <h2>Shipping Address</h2>
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               name="name"
// // // // // // //               placeholder="Full Name"
// // // // // // //               onChange={handleInputChange}
// // // // // // //               required
// // // // // // //             />
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               name="address"
// // // // // // //               placeholder="Address"
// // // // // // //               onChange={handleInputChange}
// // // // // // //               required
// // // // // // //             />
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               name="city"
// // // // // // //               placeholder="City"
// // // // // // //               onChange={handleInputChange}
// // // // // // //               required
// // // // // // //             />
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               name="zip"
// // // // // // //               placeholder="ZIP Code"
// // // // // // //               onChange={handleInputChange}
// // // // // // //               required
// // // // // // //             />
// // // // // // //           </div>

// // // // // // //           <div className="payment-section">
// // // // // // //             <h2>Payment Method</h2>
// // // // // // //             <select value={paymentMethod} onChange={handlePaymentMethodChange}>
// // // // // // //               <option value="cod">Cash on Delivery (COD)</option>
// // // // // // //               <option value="upi">UPI</option>
// // // // // // //               <option value="card">Card</option>
// // // // // // //             </select>

// // // // // // //             {paymentMethod === "upi" && (
// // // // // // //               <input
// // // // // // //                 type="text"
// // // // // // //                 name="upiId"
// // // // // // //                 placeholder="e.g. yourname@bank"
// // // // // // //                 value={paymentDetails.upiId}
// // // // // // //                 onChange={handlePaymentDetailsChange}
// // // // // // //               />
// // // // // // //             )}

// // // // // // //             {paymentMethod === "card" && (
// // // // // // //               <>
// // // // // // //                 <input type="text" name="cardNumber" placeholder="Card Number" onChange={handlePaymentDetailsChange} />
// // // // // // //                 <input type="text" name="expiry" placeholder="MM/YY" onChange={handlePaymentDetailsChange} />
// // // // // // //                 <input type="text" name="cvv" placeholder="CVV" onChange={handlePaymentDetailsChange} />
// // // // // // //               </>
// // // // // // //             )}
// // // // // // //           </div>

// // // // // // //           <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
// // // // // // //             {loading ? "Processing Order..." : "Place Order"}
// // // // // // //           </button>
// // // // // // //         </>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Checkout;
// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import axios from "axios";
// // // // // // import { useNavigate } from "react-router-dom";
// // // // // // import "./Checkout.css";

// // // // // // const Checkout = () => {
// // // // // //   const [cart, setCart] = useState([]);
// // // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // // //   const [shippingDetails, setShippingDetails] = useState({
// // // // // //     name: "",
// // // // // //     address: "",
// // // // // //     city: "",
// // // // // //     zip: "",
// // // // // //   });
// // // // // //   const [paymentMethod, setPaymentMethod] = useState("cod");
// // // // // //   const [paymentDetails, setPaymentDetails] = useState({
// // // // // //     upiId: "",
// // // // // //     cardNumber: "",
// // // // // //     expiry: "",
// // // // // //     cvv: "",
// // // // // //   });
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [orderId, setOrderId] = useState(null);
// // // // // //   const navigate = useNavigate();

// // // // // //   useEffect(() => {
// // // // // //     fetchCart();
// // // // // //   }, []);

// // // // // //   const fetchCart = async () => {
// // // // // //     try {
// // // // // //       const token = localStorage.getItem("token");
// // // // // //       const response = await axios.get("http://localhost:5000/api/carts", {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       });
// // // // // //       setCart(response.data);
// // // // // //       calculateTotal(response.data);
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Error fetching cart:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const calculateTotal = (items) => {
// // // // // //     const total = items.reduce(
// // // // // //       (acc, item) => acc + (item.product?.price || 0) * item.quantity,
// // // // // //       0
// // // // // //     );
// // // // // //     setTotalPrice(total);
// // // // // //   };

// // // // // //   const handleInputChange = (e) => {
// // // // // //     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
// // // // // //   };

// // // // // //   const handlePaymentDetailsChange = (e) => {
// // // // // //     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
// // // // // //   };

// // // // // //   const handlePaymentMethodChange = (e) => {
// // // // // //     setPaymentMethod(e.target.value);
// // // // // //   };

// // // // // //   const handlePlaceOrder = async () => {
// // // // // //     for (let item of cart) {
// // // // // //       if (!item.product) {
// // // // // //         alert("⚠️ One or more items in your cart are invalid.");
// // // // // //         return;
// // // // // //       }
// // // // // //       if (item.quantity > item.product.stock) {
// // // // // //         alert(`⚠️ Insufficient stock for ${item.product.name}. Maximum available: ${item.product.stock}`);
// // // // // //         return;
// // // // // //       }
// // // // // //     }

// // // // // //     if (
// // // // // //       !shippingDetails.name ||
// // // // // //       !shippingDetails.address ||
// // // // // //       !shippingDetails.city ||
// // // // // //       !shippingDetails.zip
// // // // // //     ) {
// // // // // //       alert("⚠️ Please fill in all shipping details.");
// // // // // //       return;
// // // // // //     }

// // // // // //     if (paymentMethod === "upi" && !paymentDetails.upiId.trim()) {
// // // // // //       alert("⚠️ Please enter your UPI ID.");
// // // // // //       return;
// // // // // //     }
// // // // // //     if (paymentMethod === "card") {
// // // // // //       if (
// // // // // //         !paymentDetails.cardNumber.trim() ||
// // // // // //         !paymentDetails.expiry.trim() ||
// // // // // //         !paymentDetails.cvv.trim()
// // // // // //       ) {
// // // // // //         alert("⚠️ Please fill in all card details.");
// // // // // //         return;
// // // // // //       }
// // // // // //     }

// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const token = localStorage.getItem("token");

// // // // // //       const orderData = {
// // // // // //         user: localStorage.getItem("userId"), // Assuming the user ID is stored in local storage
// // // // // //         items: cart
// // // // // //           .filter((item) => item.product)
// // // // // //           .map((item) => ({
// // // // // //             productId: item.product._id,
// // // // // //             quantity: item.quantity,
// // // // // //             price: item.product.price,
// // // // // //             totalPrice: item.product.price * item.quantity,
// // // // // //           })),
// // // // // //         totalPrice,
// // // // // //         shippingDetails,
// // // // // //         status: "Pending", // Default status as Pending
// // // // // //         createdAt: new Date(),
// // // // // //         paymentMethod,
// // // // // //         paymentDetails,
// // // // // //       };

// // // // // //       const response = await axios.post(
// // // // // //         "http://localhost:5000/api/orders",
// // // // // //         orderData,
// // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // //       );

// // // // // //       if (response.data && response.data.order && response.data.order._id) {
// // // // // //         setOrderId(response.data.order._id);
// // // // // //         alert("🎉 Order placed successfully!");

// // // // // //         setCart([]);
// // // // // //         setTotalPrice(0);
// // // // // //         localStorage.removeItem("cartItems");

// // // // // //         setTimeout(() => {
// // // // // //           navigate("/");
// // // // // //         }, 2000);
// // // // // //       } else {
// // // // // //         alert("⚠️ Order was not placed successfully. Try again.");
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error("❌ Error placing order:", error.response?.data || error);
// // // // // //       alert("⚠️ Failed to place order. Try again.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="checkout-container">
// // // // // //       <h1>Checkout</h1>

// // // // // //       {orderId ? (
// // // // // //         <div className="order-success">
// // // // // //           <h2>🎉 Order Placed Successfully!</h2>
// // // // // //           <p>Your order ID: <strong>{orderId}</strong></p>
// // // // // //           <button onClick={() => navigate("/")}>Go to Home</button>
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <>
// // // // // //           <div className="order-summary">
// // // // // //             <h2>Order Summary</h2>
// // // // // //             {cart.length > 0 ? (
// // // // // //               cart.map((item) => {
// // // // // //                 const product = item.product;
// // // // // //                 if (!product) return null;
// // // // // //                 return (
// // // // // //                   <div key={item._id} className="checkout-item">
// // // // // //                     <img
// // // // // //                       src={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/150"}
// // // // // //                       alt={product.name || "No name"}
// // // // // //                       className="cart-item-image"
// // // // // //                     />
// // // // // //                     <div>
// // // // // //                       <h3>{product.name || "Unnamed Product"}</h3>
// // // // // //                       <p>Quantity: {item.quantity}</p>
// // // // // //                       <p>Price: ₹{(product.price || 0) * item.quantity}</p>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 );
// // // // // //               })
// // // // // //             ) : (
// // // // // //               <p>🛒 Your cart is empty.</p>
// // // // // //             )}
// // // // // //             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
// // // // // //           </div>

// // // // // //           <div className="shipping-details">
// // // // // //             <h2>Shipping Address</h2>
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               name="name"
// // // // // //               placeholder="Full Name"
// // // // // //               onChange={handleInputChange}
// // // // // //               required
// // // // // //             />
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               name="address"
// // // // // //               placeholder="Address"
// // // // // //               onChange={handleInputChange}
// // // // // //               required
// // // // // //             />
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               name="city"
// // // // // //               placeholder="City"
// // // // // //               onChange={handleInputChange}
// // // // // //               required
// // // // // //             />
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               name="zip"
// // // // // //               placeholder="ZIP Code"
// // // // // //               onChange={handleInputChange}
// // // // // //               required
// // // // // //             />
// // // // // //           </div>

// // // // // //           <div className="payment-section">
// // // // // //             <h2>Payment Method</h2>
// // // // // //             <select value={paymentMethod} onChange={handlePaymentMethodChange}>
// // // // // //               <option value="cod">Cash on Delivery (COD)</option>
// // // // // //               <option value="upi">UPI</option>
// // // // // //               <option value="card">Card</option>
// // // // // //             </select>

// // // // // //             {paymentMethod === "upi" && (
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 name="upiId"
// // // // // //                 placeholder="e.g. yourname@bank"
// // // // // //                 value={paymentDetails.upiId}
// // // // // //                 onChange={handlePaymentDetailsChange}
// // // // // //               />
// // // // // //             )}

// // // // // //             {paymentMethod === "card" && (
// // // // // //               <>
// // // // // //                 <input type="text" name="cardNumber" placeholder="Card Number" onChange={handlePaymentDetailsChange} />
// // // // // //                 <input type="text" name="expiry" placeholder="MM/YY" onChange={handlePaymentDetailsChange} />
// // // // // //                 <input type="text" name="cvv" placeholder="CVV" onChange={handlePaymentDetailsChange} />
// // // // // //               </>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
// // // // // //             {loading ? "Processing Order..." : "Place Order"}
// // // // // //           </button>
// // // // // //         </>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Checkout;
// // // // // import React, { useEffect, useState } from "react";
// // // // // import axios from "axios";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import "./Checkout.css"; // Ensure CSS file exists

// // // // // const Checkout = () => {
// // // // //   const [cart, setCart] = useState([]);
// // // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // // //   const [shippingDetails, setShippingDetails] = useState({
// // // // //     name: "",
// // // // //     address: "",
// // // // //     city: "",
// // // // //     zip: "",
// // // // //   });
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [orderId, setOrderId] = useState(null);
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     fetchCart();
// // // // //   }, []);

// // // // //   const fetchCart = async () => {
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const response = await axios.get("http://localhost:5000/api/carts", {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });

// // // // //       console.log("🟢 Cart Data:", response.data); // Debugging
// // // // //       setCart(response.data);
// // // // //       calculateTotal(response.data);
// // // // //     } catch (error) {
// // // // //       console.error("❌ Error fetching cart:", error);
// // // // //     }
// // // // //   };

// // // // //   const calculateTotal = (items) => {
// // // // //     const total = items.reduce(
// // // // //       (acc, item) => acc + item.product.price * item.quantity,
// // // // //       0
// // // // //     );
// // // // //     setTotalPrice(total);
// // // // //   };

// // // // //   const handleInputChange = (e) => {
// // // // //     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
// // // // //   };

// // // // //   const handlePlaceOrder = async () => {
// // // // //     if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zip) {
// // // // //       alert("⚠️ Please fill in all shipping details.");
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const token = localStorage.getItem("token");
// // // // //       const orderData = { cartItems: cart, totalPrice, shippingDetails };

// // // // //       const response = await axios.post("http://localhost:5000/api/orders", orderData, {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       });

// // // // //       console.log("🟢 Order API Response:", response.data); // Debugging

// // // // //       if (response.data && response.data.order && response.data.order._id) {
// // // // //         setOrderId(response.data.order._id);
// // // // //         alert("🎉 Order placed successfully!");
        
// // // // //         // ✅ Clear cart locally
// // // // //         setCart([]);
// // // // //         setTotalPrice(0);

// // // // //         // ✅ Redirect to home after short delay
// // // // //         setTimeout(() => {
// // // // //           navigate("/");
// // // // //         }, 2000);
// // // // //       } else {
// // // // //         console.error("❌ Order ID is missing in response:", response.data);
// // // // //         alert("⚠️ Order was not placed successfully. Try again.");
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("❌ Error placing order:", error.response?.data || error);
// // // // //       alert("⚠️ Failed to place order. Try again.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="checkout-container">
// // // // //       <h1>Checkout</h1>

// // // // //       {orderId ? (
// // // // //         <div className="order-success">
// // // // //           <h2>🎉 Order Placed Successfully!</h2>
// // // // //           <p>Your order ID: <strong>{orderId}</strong></p>
// // // // //           <p>Thank you for shopping with us!</p>
// // // // //           <button onClick={() => navigate("/")}>Go to Home</button>
// // // // //         </div>
// // // // //       ) : (
// // // // //         <>
// // // // //           <div className="order-summary">
// // // // //             <h2>Order Summary</h2>
// // // // //             {cart.length > 0 ? (
// // // // //               cart.map((item) => (
// // // // //                 <div key={item._id} className="checkout-item">
// // // // //                   <img
// // // // //       src={item.product?.image ? `http://localhost:5000${item.product.image}` : "https://via.placeholder.com/150"}
// // // // //       alt={item.product?.name || "No name"}
// // // // //       className="cart-item-image"
// // // // //     />
// // // // //                   <div>
// // // // //                     <h3>{item.product.name}</h3>
// // // // //                     <p>Quantity: {item.quantity}</p>
// // // // //                     <p>Price: ₹{item.product.price * item.quantity}</p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))
// // // // //             ) : (
// // // // //               <p>🛒 Your cart is empty.</p>
// // // // //             )}
// // // // //             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
// // // // //           </div>

// // // // //           <div className="shipping-details">
// // // // //             <h2>Shipping Address</h2>
// // // // //             <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
// // // // //             <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
// // // // //             <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
// // // // //             <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInputChange} required />
// // // // //           </div>

// // // // //           <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
// // // // //             {loading ? "Processing Order..." : "Place Order"}
// // // // //           </button>
// // // // //         </>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Checkout;

// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "./Checkout.css"; // Ensure CSS file exists

// // // // const Checkout = () => {
// // // //   const [cart, setCart] = useState([]);
// // // //   const [totalPrice, setTotalPrice] = useState(0);
// // // //   const [shippingDetails, setShippingDetails] = useState({
// // // //     name: "",
// // // //     address: "",
// // // //     city: "",
// // // //     zip: "",
// // // //   });
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [orderId, setOrderId] = useState(null);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchCart();
// // // //   }, []);

// // // //   const fetchCart = async () => {
// // // //     try {
// // // //       const token = localStorage.getItem("token");
// // // //       const response = await axios.get("http://localhost:5000/api/carts", {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       console.log("🟢 Cart Data:", response.data); // Debugging
// // // //       setCart(response.data);
// // // //       calculateTotal(response.data);
// // // //     } catch (error) {
// // // //       console.error("❌ Error fetching cart:", error);
// // // //     }
// // // //   };

// // // //   const calculateTotal = (items) => {
// // // //     const total = items.reduce(
// // // //       (acc, item) => acc + item.product.price * item.quantity,
// // // //       0
// // // //     );
// // // //     setTotalPrice(total);
// // // //   };

// // // //   const handleInputChange = (e) => {
// // // //     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
// // // //   };

// // // //   const handlePlaceOrder = async () => {
// // // //     if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zip) {
// // // //       alert("⚠️ Please fill in all shipping details.");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     try {
// // // //       const token = localStorage.getItem("token");

// // // //       // Aligning with the Order schema
// // // //       const orderData = {
// // // //         items: cart.map(item => ({
// // // //           product: item.product._id, // Send product reference ID
// // // //           quantity: item.quantity,
// // // //           price: item.product.price,
// // // //         })),
// // // //         totalPrice,
// // // //         shippingDetails,
// // // //         status: "Pending", // Default in schema, but included for clarity
// // // //       };

// // // //       const response = await axios.post("http://localhost:5000/api/orders", orderData, {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });

// // // //       console.log("🟢 Order API Response:", response.data); // Debugging

// // // //       if (response.data && response.data.order && response.data.order._id) {
// // // //         setOrderId(response.data.order._id);
// // // //         alert("🎉 Order placed successfully!");
        
// // // //         // ✅ Clear cart locally
// // // //         setCart([]);
// // // //         setTotalPrice(0);

// // // //         // ✅ Redirect to home after short delay
// // // //         setTimeout(() => {
// // // //           navigate("/");
// // // //         }, 2000);
// // // //       } else {
// // // //         console.error("❌ Order ID is missing in response:", response.data);
// // // //         alert("⚠️ Order was not placed successfully. Try again.");
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("❌ Error placing order:", error.response?.data || error);
// // // //       alert("⚠️ Failed to place order. Try again.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="checkout-container">
// // // //       <h1>Checkout</h1>

// // // //       {orderId ? (
// // // //         <div className="order-success">
// // // //           <h2>🎉 Order Placed Successfully!</h2>
// // // //           <p>Your order ID: <strong>{orderId}</strong></p>
// // // //           <p>Thank you for shopping with us!</p>
// // // //           <button onClick={() => navigate("/")}>Go to Home</button>
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           <div className="order-summary">
// // // //             <h2>Order Summary</h2>
// // // //             {cart.length > 0 ? (
// // // //               cart.map((item) => (
// // // //                 <div key={item._id} className="checkout-item">
// // // //                   <img
// // // //     src={item.product?.image ? `http://localhost:5000${item.product.image}` : "https://via.placeholder.com/150"}
// // // //      alt={item.product?.name || "No name"}
// // // //      className="cart-item-image"
// // // //    />
// // // //                   <div>
// // // //                     <h3>{item.product.name}</h3>
// // // //                     <p>Quantity: {item.quantity}</p>
// // // //                     <p>Price: ₹{item.product.price * item.quantity}</p>
// // // //                   </div>
// // // //                 </div>
// // // //               ))
// // // //             ) : (
// // // //               <p>🛒 Your cart is empty.</p>
// // // //             )}
// // // //             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
// // // //           </div>

// // // //           <div className="shipping-details">
// // // //             <h2>Shipping Address</h2>
// // // //             <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
// // // //             <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
// // // //             <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
// // // //             <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInputChange} required />
// // // //           </div>

// // // //           <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
// // // //             {loading ? "Processing Order..." : "Place Order"}
// // // //           </button>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Checkout;
// // // import React, { useEffect, useState, useRef } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";
// // // import "./Checkout.css"; // Ensure CSS file exists

// // // const Checkout = () => {
// // //   const [cart, setCart] = useState([]);
// // //   const [totalPrice, setTotalPrice] = useState(0);
// // //   const [shippingDetails, setShippingDetails] = useState({
// // //     name: "",
// // //     address: "",
// // //     city: "",
// // //     zip: "",
// // //   });
// // //   const [loading, setLoading] = useState(false);
// // //   const [orderId, setOrderId] = useState(null);
// // //   const navigate = useNavigate();
  
// // //   // Use a ref to ensure fetchCart is only called once
// // //   const fetchCalled = useRef(false);

// // //   useEffect(() => {
// // //     if (!fetchCalled.current) {
// // //       fetchCart();
// // //       fetchCalled.current = true;
// // //     }
// // //   }, []);

// // //   const fetchCart = async () => {
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const response = await axios.get("http://localhost:5000/api/carts", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       console.log("🟢 Cart Data:", response.data); // Debugging
// // //       setCart(response.data);
// // //       calculateTotal(response.data);
// // //     } catch (error) {
// // //       console.error("❌ Error fetching cart:", error);
// // //     }
// // //   };

// // //   const calculateTotal = (items) => {
// // //     const total = items.reduce(
// // //       (acc, item) => acc + (item.product?.price || 0) * item.quantity,
// // //       0
// // //     );
// // //     setTotalPrice(total);
// // //   };

// // //   const handleInputChange = (e) => {
// // //     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
// // //   };

// // //   const handlePlaceOrder = async () => {
// // //     // Validate shipping details
// // //     if (
// // //       !shippingDetails.name ||
// // //       !shippingDetails.address ||
// // //       !shippingDetails.city ||
// // //       !shippingDetails.zip
// // //     ) {
// // //       alert("⚠️ Please fill in all shipping details.");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const token = localStorage.getItem("token");

// // //       // Build order data according to your Order schema
// // //       const orderData = {
// // //         items: cart
// // //           .filter((item) => item.product)
// // //           .map((item) => ({
// // //             product: item.product._id,
// // //             quantity: item.quantity,
// // //             price: item.product.price,
// // //           })),
// // //         totalPrice,
// // //         shippingDetails,
// // //         status: "Pending",
// // //       };

// // //       const response = await axios.post(
// // //         "http://localhost:5000/api/orders",
// // //         orderData,
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );

// // //       console.log("🟢 Order API Response:", response.data); // Debugging

// // //       if (response.data && response.data.order && response.data.order._id) {
// // //         setOrderId(response.data.order._id);
// // //         alert("🎉 Order placed successfully!");
        
// // //         // Clear cart in local state
// // //         setCart([]);
// // //         setTotalPrice(0);
// // //         localStorage.removeItem("cartItems");

// // //         // Redirect to home after a short delay
// // //         setTimeout(() => {
// // //           navigate("/");
// // //         }, 2000);
// // //       } else {
// // //         console.error("❌ Order ID is missing in response:", response.data);
// // //         alert("⚠️ Order was not placed successfully. Try again.");
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ Error placing order:", error.response?.data || error);
// // //       alert("⚠️ Failed to place order. Try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="checkout-container">
// // //       <h1>Checkout</h1>

// // //       {orderId ? (
// // //         <div className="order-success">
// // //           <h2>🎉 Order Placed Successfully!</h2>
// // //           <p>Your order ID: <strong>{orderId}</strong></p>
// // //           <p>Thank you for shopping with us!</p>
// // //           <button onClick={() => navigate("/")}>Go to Home</button>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div className="order-summary">
// // //             <h2>Order Summary</h2>
// // //             {cart.length > 0 ? (
// // //               cart.map((item) => {
// // //                 const product = item.product;
// // //                 if (!product) return null;
// // //                 return (
// // //                   <div key={item._id} className="checkout-item">
// // //                     <img
// // //                       src={
// // //                         product.image
// // //                           ? `http://localhost:5000${product.image}`
// // //                           : "https://via.placeholder.com/150"
// // //                       }
// // //                       alt={product.name || "No name"}
// // //                       className="cart-item-image"
// // //                     />
// // //                     <div>
// // //                       <h3>{product.name || "Unnamed Product"}</h3>
// // //                       <p>Quantity: {item.quantity}</p>
// // //                       <p>Price: ₹{(product.price || 0) * item.quantity}</p>
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               })
// // //             ) : (
// // //               <p>🛒 Your cart is empty.</p>
// // //             )}
// // //             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
// // //           </div>

// // //           <div className="shipping-details">
// // //             <h2>Shipping Address</h2>
// // //             <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
// // //             <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
// // //             <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
// // //             <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInputChange} required />
// // //           </div>

// // //           <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
// // //             {loading ? "Processing Order..." : "Place Order"}
// // //           </button>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Checkout;
// // // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./Checkout.css"; // Ensure CSS file exists

// // const Checkout = () => {
// //   const [cart, setCart] = useState([]);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [shippingDetails, setShippingDetails] = useState({
// //     name: "",
// //     address: "",
// //     city: "",
// //     zip: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [orderId, setOrderId] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchCart();
// //   }, []);

// //   const fetchCart = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.get("http://localhost:5000/api/carts", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log("🟢 Cart Data:", response.data); // Debugging
// //       setCart(response.data);
// //       calculateTotal(response.data);
// //     } catch (error) {
// //       console.error("❌ Error fetching cart:", error);
// //     }
// //   };

// //   const calculateTotal = (items) => {
// //     const total = items.reduce(
// //       (acc, item) => acc + item.product.price * item.quantity,
// //       0
// //     );
// //     setTotalPrice(total);
// //   };

// //   const handleInputChange = (e) => {
// //     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
// //   };

// //   const handlePlaceOrder = async () => {
// //     if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zip) {
// //       alert("⚠️ Please fill in all shipping details.");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
// //       const orderData = { cartItems: cart, totalPrice, shippingDetails };

// //       const response = await axios.post("http://localhost:5000/api/orders", orderData, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log("🟢 Order API Response:", response.data); // Debugging

// //       if (response.data && response.data.order && response.data.order._id) {
// //         setOrderId(response.data.order._id);
// //         alert("🎉 Order placed successfully!");
        
// //         // ✅ Clear cart locally
// //         setCart([]);
// //         setTotalPrice(0);

// //         // ✅ Redirect to home after short delay
// //         setTimeout(() => {
// //           navigate("/");
// //         }, 2000);
// //       } else {
// //         console.error("❌ Order ID is missing in response:", response.data);
// //         alert("⚠️ Order was not placed successfully. Try again.");
// //       }
// //     } catch (error) {
// //       console.error("❌ Error placing order:", error.response?.data || error);
// //       alert("⚠️ Failed to place order. Try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="checkout-container">
// //       <h1>Checkout</h1>

// //       {orderId ? (
// //         <div className="order-success">
// //           <h2>🎉 Order Placed Successfully!</h2>
// //           <p>Your order ID: <strong>{orderId}</strong></p>
// //           <p>Thank you for shopping with us!</p>
// //           <button onClick={() => navigate("/")}>Go to Home</button>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="order-summary">
// //             <h2>Order Summary</h2>
// //             {cart.length > 0 ? (
// //               cart.map((item) => (
// //                 <div key={item._id} className="checkout-item">
// //                   <img
// //   src={`http://localhost:5000${item.product.image}`} // ✅ Ensure correct path
// //   alt={item.product.name}
// //   className="cart-item-image"
// // />

// //                   <div>
// //                     <h3>{item.product.name}</h3>
// //                     <p>Quantity: {item.quantity}</p>
// //                     <p>Price: ₹{item.product.price * item.quantity}</p>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p>🛒 Your cart is empty.</p>
// //             )}
// //             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
// //           </div>

// //           <div className="shipping-details">
// //             <h2>Shipping Address</h2>
// //             <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
// //             <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
// //             <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
// //             <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInputChange} required />
// //           </div>

// //           <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
// //             {loading ? "Processing Order..." : "Place Order"}
// //           </button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Checkout;
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Checkout.css"; // Ensure CSS file exists

// const Checkout = () => {
//   const [cart, setCart] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [shippingDetails, setShippingDetails] = useState({
//     name: "",
//     address: "",
//     city: "",
//     zip: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [orderId, setOrderId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/carts", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("🟢 Cart Data:", response.data); // Debugging
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

//   const handleInputChange = (e) => {
//     setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
//   };

//   const handlePlaceOrder = async () => {
//     if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zip) {
//       alert("⚠️ Please fill in all shipping details.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const orderData = { cartItems: cart, totalPrice, shippingDetails };

//       const response = await axios.post("http://localhost:5000/api/orders", orderData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("🟢 Order API Response:", response.data); // Debugging

//       if (response.data && response.data.order && response.data.order._id) {
//         setOrderId(response.data.order._id);
//         alert("🎉 Order placed successfully!");
        
//         // ✅ Clear cart locally
//         setCart([]);
//         setTotalPrice(0);

//         // ✅ Redirect to home after short delay
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } else {
//         console.error("❌ Order ID is missing in response:", response.data);
//         alert("⚠️ Order was not placed successfully. Try again.");
//       }
//     } catch (error) {
//       console.error("❌ Error placing order:", error.response?.data || error);
//       alert("⚠️ Failed to place order. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h1>Checkout</h1>

//       {orderId ? (
//         <div className="order-success">
//           <h2>🎉 Order Placed Successfully!</h2>
//           <p>Your order ID: <strong>{orderId}</strong></p>
//           <p>Thank you for shopping with us!</p>
//           <button onClick={() => navigate("/")}>Go to Home</button>
//         </div>
//       ) : (
//         <>
//           <div className="order-summary">
//             <h2>Order Summary</h2>
//             {cart.length > 0 ? (
//               cart.map((item) => (
//                 <div key={item._id} className="checkout-item">
//                   <img
//   src={`http://localhost:5000${item.product.image}`} // ✅ Ensure correct path
//   alt={item.product.name}
//   className="cart-item-image"
// />

//                   <div>
//                     <h3>{item.product.name}</h3>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Price: ₹{item.product.price * item.quantity}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>🛒 Your cart is empty.</p>
//             )}
//             <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
//           </div>

//           <div className="shipping-details">
//             <h2>Shipping Address</h2>
//             <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
//             <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
//             <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
//             <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInputChange} required />
//           </div>

//           <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
//             {loading ? "Processing Order..." : "Place Order"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Checkout;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // Ensure CSS file exists

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/carts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🟢 Cart Data:", response.data); // Debugging
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

  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zip) {
      alert("⚠️ Please fill in all shipping details.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const orderData = { cartItems: cart, totalPrice, shippingDetails };

      const response = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🟢 Order API Response:", response.data); // Debugging

      if (response.data && response.data.order && response.data.order._id) {
        setOrderId(response.data.order._id);
        alert("🎉 Order placed successfully!");
        
        // ✅ Clear cart locally
        setCart([]);
        setTotalPrice(0);

        // ✅ Redirect to home after short delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error("❌ Order ID is missing in response:", response.data);
        alert("⚠️ Order was not placed successfully. Try again.");
      }
    } catch (error) {
      console.error("❌ Error placing order:", error.response?.data || error);
      alert("⚠️ Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {orderId ? (
        <div className="order-success">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Your order ID: <strong>{orderId}</strong></p>
          <p>Thank you for shopping with us!</p>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      ) : (
        <>
          <div className="order-summary">
            <h2>Order Summary</h2>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item._id} className="checkout-item">
                  <img
                    src={`http://localhost:5000${item.product.image}`} // ✅ Ensure correct path
                    alt={item.product.name}
                    className="cart-item-image"
                  />

                  <div>
                    <h3>{item.product.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price (incl. GST): ₹{(item.product.price + 50) * item.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>🛒 Your cart is empty.</p>
            )}
            <h2>Total Price (incl. GST): ₹{totalPrice.toFixed(2)}</h2>
          </div>

          <div className="shipping-details">
            <h2>Shipping Address</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
            <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
            <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
            <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInputChange} required />
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Processing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
