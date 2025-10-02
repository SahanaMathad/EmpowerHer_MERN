const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

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
