const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["seller", "buyer"], required: true },
  category: { type: String, enum: ["product", "service"], required: true },
  phone: String,
  state: String,
  city: String,
});

module.exports = mongoose.model("User", userSchema);
