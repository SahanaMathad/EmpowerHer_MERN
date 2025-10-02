// backend/routes/payment.js
const express = require("express");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/payments - Mock Payment Endpoint
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId, amount, paymentMethod, cardHolderName, cardNumber, expiryDate, cvv } = req.body;

    // Basic validations
    if (!orderId || !amount) {
      return res.status(400).json({ error: "orderId and amount are required." });
    }

    // Optionally, confirm the order actually exists
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Mock Payment Logic: We won't actually process a real payment
    // We'll just store the details in Payment collection

    const newPayment = new Payment({
      orderId,
      userId,
      amount,
      paymentMethod,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      status: "Paid", // Mark as "Paid" if success
    });

    await newPayment.save();

    // Optionally update the order status to "Paid"
    existingOrder.status = "Paid";
    await existingOrder.save();

    res.status(201).json({
      message: "Payment successful",
      payment: newPayment,
    });
  } catch (error) {
    console.error("❌ Error creating payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/payments/:orderId - fetch payment details for an order (optional)
router.get("/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const payment = await Payment.findOne({ orderId, userId });
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    console.error("❌ Error fetching payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
