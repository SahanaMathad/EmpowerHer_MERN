// OrderConfirmation.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return <p>No order details available.</p>;
  }

  return (
    <div>
      <h1>Order Successful!</h1>
      <h2>Order Summary</h2>
      <ul>
        {orderDetails.items.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
      <p>Total Price: ${orderDetails.totalPrice}</p>
    </div>
  );
};

export default OrderConfirmation;
