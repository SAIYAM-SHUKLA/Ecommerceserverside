require('dotenv').config();

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct); // Add a product (seller only)
router.get("/", getProducts); // Get all products
router.get("/:id", getProductById); // Get a single product by ID
router.put("/:id", protect, updateProduct); // Update a product (seller only)
router.delete("/:id", protect, deleteProduct); // Delete a product (seller only)

module.exports = router;
