const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ POST /api/cart/add - Add product to cart
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // Fetch user ID from token
    const { productId, quantity } = req.body;

    console.log("Adding to cart:", { userId, productId, quantity });

    // ✅ Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ Check if product is already in the cart
    let cartItem = await Cart.findOne({ user: userId, product: productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({
        user: userId,
        product: productId,
        quantity,
      });
    }

    await cartItem.save();
    console.log("Cart updated:", cartItem);
    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ DELETE /api/cart/:itemId - Remove an item from cart
router.delete("/:itemId", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    // Find the cart item by its ID and ensure it belongs to the authenticated user
    const cartItem = await Cart.findOne({ _id: itemId, user: userId });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    // Delete the cart item
    await Cart.findByIdAndDelete(itemId);

    res.json({ message: "Item removed from cart." });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ error: "Failed to remove item from cart." });
  }
});

// ✅ GET /api/cart - Retrieve cart items
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching cart for user:", userId);

    const cartItems = await Cart.find({ user: userId }).populate("product");
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
