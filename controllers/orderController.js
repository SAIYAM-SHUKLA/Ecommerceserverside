
require('dotenv').config();
const jwt = require("jsonwebtoken");

const Order = require("../models/order");
const Product = require("../models/product");

const createOrder = async (req, res) => {
  // console.log("request has reached here")
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product || product.stock < quantity) {
    return res.status(400).json({ message: "Product not available or insufficient stock" });
  }
  const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

  const order = new Order({
    productId,
    buyerId: decoded.id,
    sellerId: product.sellerId,
    quantity,
    totalAmount: product.price * quantity,
  });

  product.stock -= quantity;
  await product.save();
  await order.save();

  res.status(201).json({ message: "Order placed successfully", order });
};

const getOrdersByBuyer = async (req, res) => {
  const {token} = req.query
  // console.log(req.query)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;
  // console.log(id);
  const orders = await Order.find({ buyerId: id }).populate("productId", "name price");
  res.json(orders);
};

const getOrdersBySeller = async (req, res) => {
  const orders = await Order.find({ sellerId: req.user.id }).populate("productId", "name price");
  res.json(orders);
};

module.exports = { createOrder, getOrdersByBuyer, getOrdersBySeller };
