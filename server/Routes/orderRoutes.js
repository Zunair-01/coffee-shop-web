const express = require('express');
const { createOrder, getOrdersByUserId } = require('../Controllers/orderController');
const router = express.Router();

router.post('/create', createOrder);
module.exports = router;
