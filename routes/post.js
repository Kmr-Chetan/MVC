const express = require('express');
const router = express.Router();
const postControlle = require('../controllers/post_controller');
const passport =require('passport');

router.post('/create',passport.checkAuthentication, postControlle.create);

module.exports = router;