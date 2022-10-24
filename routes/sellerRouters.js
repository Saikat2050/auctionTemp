const router = require('express').Router();
const db = require('../db/db');
const sellerController = require('../controllers/sellerController');
const auth = require('../middleware/authorization');
const multer  = require('multer');
const maxSize = 2 * 1024 * 1024;
const upload = multer({ dest: '../views/public/uploads/',
limits: { fileSize: maxSize },
fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  } 
});


router.use(auth.sellerAuth);

router.get('/', sellerController.seller_dashboard);
router.get('/history', sellerController.history);
router.get('/new_item', sellerController.new_item);
router.post('/new_item', sellerController.newItem);
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