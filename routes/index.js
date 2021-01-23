const express = require('express');
const passport = require('passport');


const router = express.Router();

//importing home controller
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

//importing users for user related requests
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

module.exports = router;