const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


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