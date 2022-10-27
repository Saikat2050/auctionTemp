const router = require('express').Router();
const db = require('../db/db');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authorization');

router.use(auth.adminAuth);

router.get('/', adminController.dashboard);
router.get('/auction', adminController.auctionList);
router.get('/create', adminController.create);
router.post('/create', adminController.createAuction);
router.get('/delete', adminController.deleteAuction);
router.get('/update', adminController.update);
router.post('/update', adminController.updateAuction);
router.get('/start', adminController.startAuction);
router.get('/stop', adminController.stopAuction);
router.get('/kyc', adminController.listKyc);
router.get('/bank', adminController.listBank);
router.get('/return_item', adminController.listReturn);
router.get('/approve', adminController.approve);
router.get('/reject', adminController.reject);
router.get('/issue', adminController.listIssue);
router.get('/donate', adminController.listDonation);
router.get('/approve_return', adminController.approveReturn);
router.get('/reject_return', adminController.rejectReturn);


module.exports = router;