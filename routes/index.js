const express = require('express');
const order  = require('./order');

const router = express.Router();


// mount order routes at /order
router.use('/order', order);

module.exports = router;
