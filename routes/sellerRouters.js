const router = require('express').Router();
const db = require('../db/db');
const sellerController = require('../controllers/sellerController');

router.get('/', sellerController.seller_dashboard);

module.exports = router;