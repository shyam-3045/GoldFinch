const Razorpay = require('razorpay');
const User=require("../models/User")
const crypto = require('crypto');


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.hadleCreds = async (req, res) => {
    const { address, pincode, mobile, city, state, landmark, isDefault } = req.body.Details

    try {
        const userId = req.user.id; 

        const deliveryDetails = {
            address,
            pincode,
            mobile,
            city,
            state,
            landmark,
            isDefault: isDefault || false
        };

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (isDefault) {
            user.deliveryDetails.forEach(detail => detail.isDefault = false);
        }

        user.deliveryDetails.push(deliveryDetails);

        await user.save();

        res.status(200).json({
            message: "Delivery address added successfully",
            deliveryDetails: user.deliveryDetails,
            user
        });

    } catch (error) {
        console.error("Error adding delivery address:", error);
        res.status(500).json({ message: error.message });
    }
};




exports.createOrder = async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount:Math.round(amount * 100),  
        currency: "INR",
        receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    try {
        const order = await instance.orders.create(options);
        console.log("Order created:", order);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating order:", error);  // Log complete error object
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) 
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};
