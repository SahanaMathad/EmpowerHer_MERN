const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");
const Service = require("../models/Service");

const router = express.Router();

// ✅ Book a Service (Buyer)
router.post("/book", authMiddleware, async (req, res) => {
  try {
    const { serviceId, date, timeSlot } = req.body;
    const buyerId = req.user.id;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const booking = new Booking({
      service: serviceId,
      buyer: buyerId,
      seller: service.seller,
      date,
      timeSlot,
      status: "Pending",
    });

    await booking.save();
    res.status(201).json({ message: "Service booked successfully", booking });
  } catch (error) {
    console.error("Error booking service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Seller sees all booking requests
router.get("/seller", authMiddleware, async (req, res) => {
  try {
    const sellerId = req.user.id;
    const bookings = await Booking.find({ seller: sellerId }).populate("service buyer");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Accept Booking (Seller)
router.put("/:id/accept", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "Confirmed";
    await booking.save();

    res.json({ message: "Booking accepted", booking });
  } catch (error) {
    console.error("Error accepting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Reject Booking (Seller)
router.put("/:id/reject", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "Rejected";
    await booking.save();

    res.json({ message: "Booking rejected", booking });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ✅ Buyer sees all their bookings
router.get("/buyer", authMiddleware, async (req, res) => {
  try {
    const buyerId = req.user.id;
    const bookings = await Booking.find({ buyer: buyerId }).populate("service");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching buyer bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
