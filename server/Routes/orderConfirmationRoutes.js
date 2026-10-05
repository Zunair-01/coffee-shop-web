const express = require('express');
const { createOrderConfirmation, getOrderConfirmationByOrderId } = require('../Controllers/orderConfirmationController');
const router = express.Router();

router.post('/create', createOrderConfirmation);

module.exports = router;
