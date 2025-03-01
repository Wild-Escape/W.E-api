const Payment = require("../models/Payment.model");

module.exports.createPayment = async (req, res, next) => {
  const { experience, price } = req.body;
  try {
    const newPayment = new Payment({
      user: req.currentUserId,
      experience,
      price,
    });
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    next(error);
  }
};
