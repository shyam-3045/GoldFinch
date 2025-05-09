const Razorpay = require('razorpay');
const User=require("../models/User")

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


exports.createOredr=async(req,res)=>
{
    const { amount } = req.body;

    const options = {
        amount: amount * 100, 
        currency: "INR",
        receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    try {
        const order = await instance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

}