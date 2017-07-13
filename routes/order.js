const express = require('express');
const router = express.Router();
const orderCtrl  = require('../controller/order');

router.route('/').get(orderCtrl.order);
router.route('/v2').get(orderCtrl.getOrderViaDestination);

module.exports = router;
