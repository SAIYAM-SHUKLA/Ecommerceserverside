const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");  // Import CORS middleware
const connectDB = require("./config/db");
const { protect } = require('./middleware/authMiddleware');  // Import authentication 

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
connectDB();  // Connect to MongoDB Atlas

const app = express();
app.use(express.json());
app.use(cors());  // Enable CORS

// Protected Routes
app.use('/api/users', userRoutes);  // User routes
app.use('/api/products', productRoutes);  // Product routes
app.use('/api/orders', orderRoutes);  // Order routes with authentication

// Uncomment to enable Payments routes
// app.use('/api/payments', paymentRoutes);  // Payment routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
