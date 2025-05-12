const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order=require("../models/orders")

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const {
    products,
    deliveryDetails,
    totalAmount,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  try {
    // 2. Save order in DB
    const order = await Order.create({
      user: req.user.id,
      products,
      deliveryDetails,
      totalAmount,
      paymentInfo: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      },
      paymentStatus: "Paid",
      orderStatus: "Processing"
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getMyOrders = async (req, res) => {
  try 
  {
    const orders = await Order.find({ user: req.user.id })
  .populate('products.product')
  .sort({ createdAt: -1 });
  

        res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};