const mongoose = require('mongoose');

const orderConfirmationSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  userInfo: {
    name: String,
    address: String,
    contact: String,
  },
}, { timestamps: true });

const OrderConfirmation = mongoose.model('OrderConfirmation', orderConfirmationSchema);

module.exports = OrderConfirmation;
