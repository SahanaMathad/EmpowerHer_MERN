const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/buyer", authMiddleware, async (req, res) => {
  try {
    const buyerId = req.user.id;
    // Find orders associated with the buyer and optionally populate product details
    const orders = await Order.find({ user: buyerId }).populate("items.product");
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching buyer orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/orders/buyer
 * Fetch the current buyer's orders
 */
router.get("/buyer", authMiddleware, async (req, res) => {
  try {
    const buyerId = req.user.id;

    // Fetch orders for the logged-in buyer and populate product details
    const orders = await Order.find({ buyer: buyerId }).populate("items.product");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "No orders found for this buyer." });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching buyer orders:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});


// POST /api/orders - Place an order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItems, totalPrice, shippingDetails } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    console.log("Creating order for user:", { userId, totalPrice, shippingDetails });

    // Loop through each cart item to update product stock
    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }
      // Decrement the product quantity by the amount bought
      product.quantity -= item.quantity;
      await product.save();

      // Remove product from listing if quantity reaches zero
      if (product.quantity === 0) {
        await Product.findByIdAndDelete(product._id);
        console.log(`Product ${product.name} removed as stock is 0.`);
      }
    }

    // Create and save the new order
    const newOrder = new Order({
      user: userId,
      items: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalPrice,
      shippingDetails,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    console.log("Order placed successfully:", savedOrder);

    // Clear the user's cart only after order placement is successful
    try {
      await Cart.deleteMany({ user: userId });
      console.log("Cart cleared for user:", userId);
    } catch (cartError) {
      console.error("Error clearing cart:", cartError);
    }

    res.status(201).json({ order: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});
/**
 * GET /api/orders/seller-report
 * Fetch orders that include products sold by the authenticated seller.
 */
router.get("/seller-report", authMiddleware, async (req, res) => {
  try {
    const sellerId = req.user.id;
    console.log("Seller Report for sellerId:", sellerId);

    // Fetch all orders with populated product and buyer details
    const orders = await Order.find()
      .populate("items.product")
      .populate("user", "name email");
    console.log("Total orders fetched:", orders.length);

    // Filter orders to include only those with items that belong to this seller
    const sellerOrders = orders.filter((order) => {
      const match = order.items.some((item) => {
        if (item.product && item.product.seller) {
          const isMatch = item.product.seller.toString() === sellerId;
          console.log(
            `Order ${order._id}: product "${item.product.name}" seller "${item.product.seller.toString()}" match: ${isMatch}`
          );
          return isMatch;
        }
        return false;
      });
      return match;
    });

    console.log("Filtered seller orders count:", sellerOrders.length);
    res.status(200).json(sellerOrders);
  } catch (error) {
    console.error("Error fetching seller report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
