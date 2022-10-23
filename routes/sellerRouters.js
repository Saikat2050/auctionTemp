const router = require('express').Router();
const db = require('../db/db');
const sellerController = require('../controllers/sellerController');

router.get('/', sellerController.seller_dashboard);
//router.get('/auth/google', sellerController);
//router.get('/auth/google/callback', sellerController);

module.exports = router;