const express = require('express');
const router = express.Router();
const orderCtrl  = require('../controller/order');

router.route('/order').get(orderCtrl.order);
router.route('/v2/order').get(orderCtrl.getOrderViaDestination);

module.exports = router;
