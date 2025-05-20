const express = require('express');
const { isAuthenticated } = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCartAfterOrder
} = require('../controllers/cart');

const router = express.Router();

router.post('/add', isAuthenticated, addToCart);
router.get('/', isAuthenticated, getCart);
router.put('/update', isAuthenticated, updateCartItem);
router.delete('/remove/:productId', isAuthenticated, removeFromCart);
router.delete("/clear-cart",isAuthenticated,clearCartAfterOrder)

module.exports = router;
