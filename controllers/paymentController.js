// const Razorpay = require("razorpay");
// require("dotenv").config();
// const Order = require("../models/Order");
// const Payment = require("../models/Payment");

// Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Razorpay Order
// const createPaymentOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     // Fetch order details from the database
//     const order = await Order.findById(orderId);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // Create a Razorpay order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: order.totalAmount * 100, // Amount in paisa (INR)
//       currency: "INR",
//       receipt: `receipt_${order._id}`,
//       payment_capture: 1, // Auto-capture
//     });

//     res.json({
//       id: razorpayOrder.id,
//       currency: razorpayOrder.currency,
//       amount: razorpayOrder.amount,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Verify Razorpay Payment
// const verifyPayment = async (req, res) => {
//   const crypto = require("crypto");

//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

//     // Verify the signature
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature === razorpay_signature) {
//       // Update Payment status
//       const payment = new Payment({
//         orderId,
//         paymentId: razorpay_payment_id,
//         status: "success",
//         method: "Razorpay",
//       });
//       await payment.save();

//       res.json({ message: "Payment verified successfully", payment });
//     } else {
//       res.status(400).json({ message: "Invalid signature, payment verification failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { createPaymentOrder, verifyPayment };
