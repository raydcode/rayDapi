const ErrorResponse = require('../utils/errorResponse');
const Projects = require('../models/Project');

// @desc Get all Projects
// @route GET /api/v1/projects
// @access Public
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Projects.find();
    res
      .status(200)
      .json({ success: true, data: projects, count: projects.length });
  } catch (error) {
    next(error);
  }
};

// @desc Get all Project
// @route GET /api/v1/projects/:id
// @access Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) {
      return next(
        new ErrorResponse(`Project not Found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc  Create a Project
// @route POST /api/v1/projects
// @access Private
exports.createProject = async (req, res, next) => {
  try {
    const project = await Projects.create(req.body);
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Update a Project
// @route PUT /api/v1/projects/:id
// @access Private
exports.updateProject = async (req, res, next) => {
  try {
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
      .json({ success: true, data: project, count: projects.length });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete a Project
// @route DELETE /api/v1/projects:id
// @access Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Projects.findByIdAndDelete(req.params.id);

    if (!project) {
      return next(
        new ErrorResponse(`Project not Found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: {}, count: projects.length });
  } catch (error) {
    next(error);
  }
};
