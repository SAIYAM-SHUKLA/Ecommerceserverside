require('dotenv').config();
const jwt = require("jsonwebtoken");


const Product = require("../models/Product");

const createProduct = async (req, res) => {
  
  const { name, description, price, stock, category } = req.body;
  // console.log(req.body.token)
  const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
  // console.log(decoded);
  const product = new Product({
    sellerId: decoded.id, // Get seller's ID from the JWT
    name,
    description,
    price,
    stock,
    category,
  });

  await product.save();
  res.status(201).json({ message: "Product created successfully", product });
};

const getProducts = async (req, res) => {
  const products = await Product.find().populate("sellerId", "name email");
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

const updateProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  const product = await Product.findById(req.params.id);
  if (product && product.sellerId.toString() === req.user.id) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } else {
    res.status(404).json({ message: "Product not found or unauthorized" });
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product && product.sellerId.toString() === req.user.id) {
    await product.remove();
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found or unauthorized" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
