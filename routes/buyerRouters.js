const router = require('express').Router();
const db = require('../db/db');
const buyerController = require('../controllers/buyerController');
const auth = require('../middleware/authorization');
const {upload} = require('../config/keys');

router.use(auth.buyerAuth);

router.get('/', buyerController.buyer_dashboard);

router.get('/return', buyerController.returnItem);
router.post('/return', upload.single('avatar'),buyerController.createReturn);
router.get('/list_return', buyerController.listReturn)

module.exports = router;
