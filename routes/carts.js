var express = require('express');
var router = express.Router();
const cartsController = require('../src/controllers/cartController');

/* GET home page. */
router.get('/detail', cartsController.detail);

module.exports = router;