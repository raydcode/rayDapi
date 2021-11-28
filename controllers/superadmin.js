const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all Super Admins
// @route Get /api/v1/auth/sudoadmins
// @access Private/Super Admin

exports.getAdmins = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResponse);
});

// @desc Get single Super Admin
// @route Get /api/v1/auth/sudoadmin
// @access Private/Super Admin

exports.getAdmin = asyncHandler(async (req, res, next) => {
  const Superuser = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: Superuser });
});

// @desc Create a new Super Admin
// @route POST /api/v1/auth/sudoadmin
// @access Private/Super Admin

exports.createAdmin = asyncHandler(async (req, res, next) => {
  const Superuser = await User.create(req.body);
  res.status(201).json({ success: true, data: Superuser });
});

// @desc Update Super Admin
// @route PUT /api/v1/auth/sudoadmin/:id
// @access Private/Super Admin

exports.updateAdmin = asyncHandler(async (req, res, next) => {
  const Superuser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({ success: true, data: Superuser });
});

// @desc Delete Super Admin
// @route Delete /api/v1/auth/sudoadmin/:id
// @access Private/Super Admin

exports.deleteAdmin = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(201).json({ success: true, data: {} });
});