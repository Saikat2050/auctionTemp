const router = require('express').Router();
const db = require('../db/db');
const userController = require('../controllers/userController');

router.get('/buy/auth/google', userController);
router.get('/buy/auth/google/callback', userController);

module.exports = router;