const express=require("express")
const { createOrder,hadleCreds, verifyPayment } = require("../controllers/payment")
const { isAuthenticated } = require("../middleware/authMiddleware")
const router=express.Router()

router.post("/create-order",isAuthenticated,createOrder)
router.post("/order-details",isAuthenticated,hadleCreds)
router.post("/verify-payment",isAuthenticated,verifyPayment)

module.exports=router