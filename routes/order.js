const express = require('express');
const router = express.Router();
const orderCtrl  = require('../controller/order');

router.route('/').get(orderCtrl.order);
router.route('/v2').get(orderCtrl.getOrderViaDestination);
router.route('/v1').get(orderCtrl.getPlaces);

module.exports = router;
