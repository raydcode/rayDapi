const ErrorResponse = require('../utils/errorResponse');
const Projects = require('../models/Project');
const asyncHandler = require('../middleware/async');

// @desc Get all Projects
// @route GET /api/v1/projects
// @access Private
exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Projects.find();

  if(!projects){
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
  const project = await Projects.create(req.body);
  res.status(201).json({
    success: true,
    data: project,
  });
});

// @desc  Update a Project
// @route PUT /api/v1/projects/:id
// @access Private
exports.updateProject = asyncHandler(async (req, res, next) => {
  const project = await Projects.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return next(
      new ErrorResponse(`Project not Found with id ${req.params.id}`, 404)
    );
  }
  res
    .status(200)
    .json({ success: true, data: project });
});

// @desc  Delete a Project
// @route DELETE /api/v1/projects:id
// @access Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Projects.findByIdAndDelete(req.params.id);
  
  if (!project) {
    return next(
      new ErrorResponse(`Project not Found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
