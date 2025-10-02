const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Multer Storage Configuration (Ensure files are stored in 'uploads' folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// ✅ GET /api/products - Retrieve all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// ✅ Search Products by Name
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    res.json(products);
  } catch (error) {
    console.error("❌ Error searching products:", error);
    res.status(500).json({ error: "Error searching products" });
  }
});


// ✅ POST /api/products/add - Add a new product (with image upload)
router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    console.log("User from token:", req.user);
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    if (req.user.role !== "seller" || req.user.category !== "product") {
      return res.status(403).json({ error: "Unauthorized. Only product sellers can add products." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const { name, description, price, quantity } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`; // ✅ Ensure correct image path

    const newProduct = new Product({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      image: imageUrl,
      seller: req.user.id,
    });

    await newProduct.save();
    console.log("✅ Product saved successfully:", newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ error: "Error adding product" });
  }
});
// ✅ GET /api/products/:id - Fetch a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
