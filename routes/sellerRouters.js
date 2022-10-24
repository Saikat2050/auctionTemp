const router = require('express').Router();
const db = require('../db/db');
const sellerController = require('../controllers/sellerController');
const auth = require('../middleware/authorization');
const {upload} = require('../config/keys');


router.use(auth.sellerAuth);

router.get('/', sellerController.seller_dashboard);
router.get('/history', sellerController.history);
router.get('/new_item', sellerController.new_item);
router.post('/new_item', upload.single('avatar'),sellerController.newItem);
router.get('/items', sellerController.listItems);
router.get('/auction', sellerController.auction);
router.get('/no_kyc', sellerController.noKyc);
router.get('/list_kyc', sellerController.listKyc);
router.post('/kyc', upload.single('avatar'),sellerController.createKyc);
router.get('/no_bank', sellerController.noBank);
router.get('/list_bank', sellerController.listBank);
router.post('/bank', upload.single('avatar'), sellerController.createBank);
router.get('/profile', sellerController.profile);
router.get('/donate', sellerController.donate);
router.post('/donate', sellerController.donation);
router.get('/issue', sellerController.issue);
router.post('/issue', sellerController.issueReso);
//stripe payment pending
//router.get('/auth/google', sellerController);
//router.get('/auth/google/callback', sellerController);

module.exports = router;