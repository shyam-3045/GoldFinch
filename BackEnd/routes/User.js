const express = require('express');
const router = express.Router();
const { userSignUp, userLogin,userLogOut,userDetails} = require('../controllers/User');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/signup', userSignUp);
router.post('/login', userLogin);
router.post('/logout',userLogOut)
router.get("/user",userDetails)


module.exports = router;