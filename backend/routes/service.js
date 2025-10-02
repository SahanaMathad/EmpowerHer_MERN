const express = require("express");
const multer = require("multer");
const Service = require("../models/Service");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Add a New Service
router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, subServices, location, availability, contact } = req.body;

    if (!name || !subServices || !location || !availability || !contact || !req.file) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newService = new Service({
      seller: req.user.id,
      name,
      subServices: JSON.parse(subServices), // Ensure array format
      location,
      availability: JSON.parse(availability), // Parse days and time slots
      contact: JSON.parse(contact),
      image: `/uploads/${req.file.filename}`,
    });

    await newService.save();
    res.status(201).json({ message: "✅ Service added successfully!", service: newService });
  } catch (error) {
    console.error("❌ Error adding service:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

// ✅ Search Services by Name, SubServices & Location (Placed before /:id)
router.get("/search", async (req, res) => {
  try {
    const { query, location } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    // Build search filters
    const filters = {
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive name search
        { subServices: { $regex: query, $options: "i" } }, // Match sub-services
      ],
    };

    if (location) {
      filters.location = { $regex: location, $options: "i" };
    }

    const services = await Service.find(filters);
    res.json(services);
  } catch (error) {
    console.error("❌ Error searching services:", error);
    res.status(500).json({ error: "Error searching services. Please try again later." });
  }
});

// ✅ Fetch All Services (with Pagination Support)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default pagination values
    const services = await Service.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(services);
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

// ✅ Fetch a Single Service by ID
router.get("/:id", async (req, res) => {
  try {
    // Prevent conflict with "/search"
    if (req.params.id === "search") {
      return res.status(400).json({ error: "Invalid service ID." });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("❌ Error fetching service by ID:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

module.exports = router;
