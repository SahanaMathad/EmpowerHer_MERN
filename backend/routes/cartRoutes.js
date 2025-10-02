const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// 🛒 Add product to cart
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Get user ID from auth middleware

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required." });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Check if the product is already in the cart
        let cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = new Cart({
                userId,
                productId,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity,
            });
            await cartItem.save();
        }

        res.status(200).json({ message: "Product added to cart successfully!", cartItem });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;