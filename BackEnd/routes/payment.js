const express=require("express")
const { createOredr,hadleCreds } = require("../controllers/payment")
const { isAuthenticated } = require("../middleware/authMiddleware")
const router=express.Router()

router.post("/create-order",isAuthenticated,createOredr)
router.post("/order-details",isAuthenticated,hadleCreds)

module.exports=router