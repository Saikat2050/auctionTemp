const router = require('express').Router();
const db = require('../db/db');
const userController = require('../controllers/userController');

router.get('/', userController.dashboard);
router.get('/buyer_login', userController.buyer_login);
router.post('/buyer_login', userController.buyLogin);
router.get('/seller_login', userController.seller_login);
router.post('/seller_login', userController.sellLogin);
router.get('/buyer_register', userController.buyer_register);
router.post('/buyer_register', userController.buyRegistration);
router.get('/seller_register', userController.seller_register);
router.post('/seller_register', userController.sellRegistration);


module.exports = router;