const express=require("express")
const { createOredr,hadleCreds, verifyPayment } = require("../controllers/payment")
const { isAuthenticated } = require("../middleware/authMiddleware")
const router=express.Router()

router.post("/create-order",isAuthenticated,createOredr)
router.post("/order-details",isAuthenticated,hadleCreds)
router.post("/verify-payment",isAuthenticated,verifyPayment)

module.exports=router