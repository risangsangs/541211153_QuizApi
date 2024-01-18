const jobsheetController = require('../controllers/jobsheet');
const router = require('express').Router();

const { verifyToken } = require('../middlewares/authJwt');

router.post('/one', [verifyToken], jobsheetController.submitOne);
router.post('/many', [verifyToken], jobsheetController.submitMany);

module.exports = router;