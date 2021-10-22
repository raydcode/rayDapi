// @desc Get all Projects
// @route GET /api/v1/projects
// @access Public
exports.getProjects = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all projects' });
};

// @desc Get all Project
// @route GET /api/v1/projects/:id
// @access Public
exports.getProject = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get project ${req.params?.id}` });
};

// @desc  Create a Project
// @route POST /api/v1/projects
// @access Private
exports.createProject = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create New Project' });
};

// @desc  Update a Project
// @route PUT /api/v1/projects/:id
// @access Private
exports.updateProject = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update project ${req.params?.id}` });
};

// @desc  Delete a Project
// @route DELETE /api/v1/projects:id
// @access Private
exports.deleteProject = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Project ${req.params?.id}` });
};
