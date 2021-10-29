const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { findOne } = require('../models/User');

// @desc Register a new User
// @route POST /api/v1/auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //  Create User
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //    Create Token

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});


// @desc Login User
// @route Post /api/v1/auth/register
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
    const {  email, password } = req.body;
  
          
    // Validate Email and Password
    
    if(!email || !password) {

        return next(new ErrorResponse('Please Provide  an Email and password',400));

    }
 
     // Check User
     const user = await User.findOne({email}).select('+password');

     if(!user){
        return next(new ErrorResponse('Invalid Credentials',401));
     }

    const  isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid Credentials',401));
    }
    
    //    Create Token
  
    const token = user.getSignedJwtToken();
  
    res.status(200).json({ success: true, token });
  });
  