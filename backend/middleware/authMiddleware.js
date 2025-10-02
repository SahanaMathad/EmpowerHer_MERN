// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   if (req.method === "OPTIONS") return next();

//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "No token provided or token malformed" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       console.warn("⚠️ Token expired. User must log in again.");
//       return res.status(401).json({ error: "Session expired. Please log in again." });
//     }
//     return res.status(401).json({ error: "Invalid token." });
//   }
// };

// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided or token malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Log decoded token for debugging

    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.warn("⚠️ Token expired. User must log in again.");
      return res.status(401).json({ error: "Session expired. Please log in again." });
    }
    console.error("❌ Invalid token:", error);
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;

