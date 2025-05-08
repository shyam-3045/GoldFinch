const express=require("express")
const { createOredr } = require("../controllers/payment")
const router=express.Router()

router.post("/create-order",createOredr)

module.exports=router