const express = require('express');
const router = express.Router();
const orderCtrl  = require('../controller/order');

router.route('/').get(orderCtrl.order);

module.exports = router;
