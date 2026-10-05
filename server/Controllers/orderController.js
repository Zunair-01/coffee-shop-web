const Order = require('../Models/Order');


exports.createOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    const newOrder = new Order({ userId, items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


