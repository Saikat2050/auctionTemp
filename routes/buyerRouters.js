const router = require('express').Router();
const db = require('../db/db');
const buyerController = require('../controllers/buyerController');
const auth = require('../middleware/authorization');
const {upload} = require('../config/keys');

router.use(auth.buyerAuth);

router.get('/', buyerController.buyer_dashboard);
router.get('/profile', buyerController.profile);
router.get('/history', buyerController.history);
router.get('/no_kyc', buyerController.noKyc);
router.get('/list_kyc', buyerController.listKyc);
router.post('/kyc', upload.single('avatar'),buyerController.createKyc);
router.get('/auction', buyerController.auction);
router.get('/donate', buyerController.donate);
router.post('/donate', buyerController.donation);
router.get('/return', buyerController.returnItem);
router.post('/return', upload.single('avatar'),buyerController.createReturn);
router.get('/list_return', buyerController.listReturn);
router.get('/issue', buyerController.issue);
router.post('/issue', buyerController.issueReso);

module.exports = router;
