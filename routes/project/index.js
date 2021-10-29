const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../../controllers/project');

const { protect, authorize } = require('../../middleware/auth');

router
  .route('/')
  .get(protect, getProjects)
  .post(protect, authorize('admin','superuser'), createProject);

router
  .route('/:id')
  .get(protect, getProject)
  .put(protect, authorize('admin', 'superuser'), updateProject)
  .delete(protect, authorize('admin', 'superuser'), deleteProject);

module.exports = router;
