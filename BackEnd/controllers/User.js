const User = require("../models/User");
const bcrypt = require("bcryptjs");  
const jwt = require("jsonwebtoken"); 

exports.userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Required Parameters Missing" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashPwd });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ msg: "Required Parameters Missing" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.userLogOut=async(req,res)=>
{
  return res.json({msg:"Logout successfully !"})
}