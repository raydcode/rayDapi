const express = require('express');
const {register,login,who,forgotPassword,resetPassword,updateDetails,updatePassword,logout} = require('../../controllers/auth');

const router = express.Router();

const {protect} = require('../../middleware/auth');

router.post('/register',register);

router.post('/login',login);

router.get('/logout',logout);

router.get('/who',protect,who);

router.put('/updatedetails',protect,updateDetails);

router.put('/updatepassword',protect,updatePassword);

router.post('/forgotPassword',forgotPassword);

router.put('/resetPassword/:resettoken',resetPassword);





module.exports = router;