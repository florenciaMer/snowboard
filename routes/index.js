var express = require('express');
var router = express.Router();
const indexController = require('../src/controllers/indexController');
const cartController = require('../src/controllers/cartController')
/* GET home page. */
router.get('/', indexController.list);
router.get('/order/:id', cartController.order);


module.exports = router;
