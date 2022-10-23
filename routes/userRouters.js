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
router.get('/buy_otp', userController.buy_otp);
router.post('/buy_otp', userController.buyOtp);
router.get('/buyer_otp', userController.buyer_otp);
router.get('/sell_otp', userController.sell_otp);
router.post('/sell_otp', userController.sellOtp);
router.get('/seller_otp', userController.seller_otp);
router.get('/buyer_forget', userController.buyer_forget);
router.post('/buyer_forget', userController.buyForget);
router.get('/buyer_reset', userController.buyer_reset);
router.post('/buyer_reset', userController.buyerReset);
router.get('/seller_forget', userController.seller_forget);
router.post('/seller_forget', userController.sellForget);
router.get('/seller_reset', userController.seller_reset);
router.post('/seller_reset', userController.sellerReset);

module.exports = router;