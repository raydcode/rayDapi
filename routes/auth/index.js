const express = require('express');
const {register,login,who} = require('../../controllers/auth');

const router = express.Router();

const {protect} = require('../../middleware/auth');

router.post('/register',register);

router.post('/login',login);

router.get('/who',protect,who);


module.exports = router;