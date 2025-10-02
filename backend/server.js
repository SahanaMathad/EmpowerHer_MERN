require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/Cart"); // 🔹 Fixed case sensitivity
const orderRoutes = require("./routes/Order");
const serviceRoutes=require("./routes/service"); // 🔹 Added order routes
const bookingRoutes = require("./routes/booking");
const sellerReportRoutes = require("./routes/sellerReport");

app.use("/api/bookings", bookingRoutes);

// ✅ This should exist



// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes); 
app.use("/api/seller-report", sellerReportRoutes);


app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
//app.use("/api/payments", require("./routes/paymentRoutes"));
//app.use("/api/payments", payment); 

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 // ✅ Added order route

// ✅ Confirm Routes Are Loaded
console.log("✅ All routes loaded successfully.");

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
