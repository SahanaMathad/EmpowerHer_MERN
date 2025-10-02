// backend/models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String, // e.g. "Card", "UPI", "COD", etc.
    default: "Card",
  },
  cardHolderName: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  expiryDate: {
    type: String,
  },
  cvv: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending", // "Pending", "Paid", "Failed", etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
