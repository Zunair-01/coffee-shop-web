const OrderConfirmation = require('../Models/orderConfirmationModel');


exports.createOrderConfirmation = async (req, res) => {
  try {
    const { orderId, userInfo } = req.body;
    const newOrderConfirmation = new OrderConfirmation({ orderId, userInfo });
    await newOrderConfirmation.save();
    res.status(201).json(newOrderConfirmation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



