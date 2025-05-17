const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders,getAllOrders } = require('../controllers/order');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/createOrder',isAuthenticated, createOrder);
router.get('/my-orders', isAuthenticated, getMyOrders);
router.get("/get-orders",getAllOrders)

module.exports = router;
