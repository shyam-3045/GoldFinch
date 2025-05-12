const express =require("express")
const router=express.Router()
const { isAuthenticated } = require("../middleware/authMiddleware")
const { sendOtp, verifyOtp } = require("../controllers/otpMailer")

router.post("/send-otp",isAuthenticated,sendOtp)
router.post("/verify-otp",isAuthenticated,verifyOtp)


module.exports=router