const express = require("express");
const router = express.Router();
const { createProductReview,deleteProductReview } = require("../controllers/productreview");
const { isAuthenticated } = require("../middleware/authMiddleware");


router.put("/review", isAuthenticated, createProductReview);
router.delete("/review", isAuthenticated, deleteProductReview);

module.exports = router;