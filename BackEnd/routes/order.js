const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/order');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/createOrder',isAuthenticated, createOrder);
router.get('/my-orders', isAuthenticated, getMyOrders);

module.exports = router;
