const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order=require("../models/orders")

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
exports.getAllOrders=async(req,res)=>
{
   try {
    const orders = await Order.find(
    ).populate('products.product')
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
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
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment details missing" });
    }

    const cleanedProducts = products.map(item => ({
      product: item.product._id || item.product,
      quantity: item.quantity
    }));

    const order = await Order.create({
      user: req.user.id,
      products: cleanedProducts,
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

exports.editOrder=async(req,res)=>
{
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('user').populate('products.product');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order updated successfully',
      order: updatedOrder,
    });

  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}