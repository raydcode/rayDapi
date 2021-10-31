const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

  sendTokenResponse(user, 200, res);
});

// @desc Login User
// @route Post /api/v1/auth/login
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate Email and Password

  if (!email || !password) {
    return next(
      new ErrorResponse('Please Provide  an Email and password', 400)
    );
  }

  // Check User and Password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});







// @desc  Log out 
// @route GET /api/v1/auth/logout
// @access Private

exports.logout = asyncHandler(async (req, res, next) => {
  
  res.cookie('token','none',{
    expires: new Date(Date.now()+ 10 *1000),
    httpOnly: true
  })

  res.status(200).json({ success: true, data: {}});
});





// @desc  Get current Logged In User
// @route Post /api/v1/auth/who
// @access Private

exports.who = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});




// @desc  Update user details
// @route PUT /api/v1/auth/updatedetails
// @access Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
   const  filedsToUpdate = {
     name:req.body.name,
     email:req.body.email
   }

  const user = await User.findByIdAndUpdate(req.user.id,filedsToUpdate,{
    new:true,
    runValidators: true
  });
  res.status(200).json({ success: true, data: user });
});




// @desc   Update user  Password
// @route PUT /api/v1/auth/updatepassword
// @access Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
   
  const user = await User.findById(req.user.id).select('+password');

   //Check Current password 

   const isMatch = await user.matchPassword(req.body.currentPassword);

   if(!isMatch){
     return next(new ErrorResponse('Password is incorrect',401));
   }

   user.password = req.body.newPassword;
   await user.save();

  sendTokenResponse(user, 200, res);
});





// @desc  Forgot Password
// @route Post /api/v1/auth/forgotpassword
// @access Public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no User with Email', 404));
  }

  //  Get reset Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // create reset url

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `Someone (hopefully you) has requested a password reset for your  account. Follow the link below to set a new password: Please make a PUT request to \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'password reset token',
      message,
    });
    res
      .status(200)
      .json({ success: true, data: 'Email sent to reset your password' });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not sent', 500));
  }

  res.status(200).json({ success: true, data: user });
});

// @desc  Reset Password
// @route PUT /api/v1/auth/resetpassword/:resettoken
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed Token

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid Token', 400));
  }

  //Set New password

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
});

//   get token from modal and Create cookie and send response back

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  if (process.env.NODE_ENV == 'production') {
    options.secure = true;
  }

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
