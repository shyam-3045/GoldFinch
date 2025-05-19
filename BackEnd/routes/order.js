const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders,getAllOrders,editOrder } = require('../controllers/order');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/createOrder',isAuthenticated, createOrder);
router.get('/my-orders', isAuthenticated, getMyOrders);
router.get("/get-orders",getAllOrders)
router.put("/edit-orders/:id",editOrder)

module.exports = router;
