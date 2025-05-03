const express = require("express");
const router = express.Router();
const {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} = require("../controllers/favorites");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, addToFavorites);
router.delete("/:productId", isAuthenticated, removeFromFavorites);
router.get("/", isAuthenticated, getFavorites);

module.exports = router;
