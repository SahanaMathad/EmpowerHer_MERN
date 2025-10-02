const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  subServices: { type: [String], required: true },
  location: { type: String, required: true },
  availability: {
    days: { type: [String], required: true },
    timeSlots: { type: String, required: true },
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    instagram: { type: String },
  },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Service", serviceSchema);
