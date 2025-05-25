const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post('/razorpay/webhook', (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];

  const hash = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('hex');

  if (hash === signature) {
    const event = JSON.parse(req.body.toString());

    if (event.event === 'payment.captured') {
      console.log('✅ Payment Captured:', event.payload.payment.entity.id);
      // 👉 Update order status in DB
    } else if (event.event === 'payment.failed') {
      console.log('❌ Payment Failed:', event.payload.payment.entity.id);
      // 👉 Notify user or mark as failed
    } else {
      console.log('📦 Unhandled event:', event.event);
    }

    res.status(200).json({ status: 'ok' });
  } else {
    console.log('❌ Invalid Signature');
    res.status(400).send('Invalid signature');
  }
});

module.exports = router;
