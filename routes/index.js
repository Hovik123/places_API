const express = require('express');
const order  = require('./order');

const router = express.Router();


// mount order routes at /
router.use('/', order);

module.exports = router;
