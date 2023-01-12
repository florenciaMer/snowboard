var express = require('express');
var router = express.Router();
const apiController = require('../src/controllers/apiController');

/* GET home page. */
router.get('/product/:id', apiController.detail);
router.post('/checkout/', apiController.checkout);


module.exports = router;