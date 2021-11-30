const express = require('express');

const {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require('../../controllers/superadmin');

const router = express.Router();

const { protect, authorize } = require('../../middleware/auth');

router.use(protect);
router.use(authorize('superadmin'));

router.route('/').get(getAdmins).post(createAdmin);

router.route('/:id').get(getAdmin).put(updateAdmin).delete(deleteAdmin);

module.exports = router;
