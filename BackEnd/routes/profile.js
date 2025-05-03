const express=require("express")
const { getUserProfile } = require("../controllers/profile")
const { isAuthenticated } = require("../middleware/authMiddleware")
const router=express.Router()

router.get("/profile",isAuthenticated,getUserProfile)


module.exports=router
