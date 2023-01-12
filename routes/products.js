var express = require('express');
var router = express.Router();
const productController = require('../src/controllers/productController');

/* GET home page. */
router.get('/detail/:id', productController.detail);


module.exports = router;