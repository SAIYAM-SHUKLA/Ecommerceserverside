require('dotenv').config();

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrdersByBuyer,
  getOrdersBySeller,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder); // Place an order (buyer only)
router.get("/buyer", getOrdersByBuyer); // View orders as a buyer
router.get("/seller", protect, getOrdersBySeller); // View orders as a seller

module.exports = router;
