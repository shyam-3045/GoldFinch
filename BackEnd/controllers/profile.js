const User = require("../models/User");
const mongoose = require("mongoose");


exports.getUserProfile = async (req, res) => {
  try {
    const id = req.user.id
    const user = await User.findById(id);  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", msg:error.message });
  }
};

exports.updateuserProfile=async(req,res)=>
{
  try {
    const {name,email,address}=req.body
    const id=req.user.id
    const User=await User.findById(id)
    if(!User)
    {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedProfile=await User.findByIdAndUpdate(req.user,{name,email,address},{new:true,runValidators:true})

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });

    
  }
  

  
}
