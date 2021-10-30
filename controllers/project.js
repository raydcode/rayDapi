const ErrorResponse = require('../utils/errorResponse');
const Projects = require('../models/Project');
const asyncHandler = require('../middleware/async');

// @desc Get all Projects
// @route GET /api/v1/projects
// @access Private
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Projects.find();

  if (!projects) {
    new ErrorResponse(`Projects not Found`, 404);
  }

  res
    .status(200)
    .json({ success: true, data: projects, count: projects.length });
});

// @desc Get all Project
// @route GET /api/v1/projects/:id
// @access Private
exports.getProject = asyncHandler(async (req, res, next) => {
  const project = await Projects.findById(req.params.id);
  if (!project) {
    return next(
      new ErrorResponse(`Project not Found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: project });
});

// @desc  Create a Project
// @route POST /api/v1/projects
// @access Private
exports.createProject = asyncHandler(async (req, res, next) => {
  // add user to req.body
  req.body.user = req.user.id;

  //Check for  project

  const project = await Projects.create(req.body);

  res.status(201).json({
    success: true,
    data: project,
  });
});

// @desc  Update a Project
// @route PUT /api/v1/projects/:id
// @access Public
exports.updateProject = asyncHandler(async (req, res, next) => {
  let project = await Projects.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not Found with id ${req.params.id}`, 404)
    );
  }
  // ownership
  if (
    project.user.toString() !== req.user.id &&
    req.user.role !== 'superadmin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to this project`,
        401
      )
    );
  }

  project = await Projects.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: project });
});

// @desc  Delete a Project
// @route DELETE /api/v1/projects:id
// @access Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
  let project = await Projects.findById(req.params.id);

  if (!project) {
    return next(
      new ErrorResponse(`Project not Found with id ${req.params.id}`, 404)
    );
  }
  //ownership
  if (
    project.user.toString() !== req.user.id &&
    req.user.role !== 'superadmin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to this project`,
        401
      )
    );
  }

  project = await Projects.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {}, message: 'Project Deleted SuccesFully' });
});
