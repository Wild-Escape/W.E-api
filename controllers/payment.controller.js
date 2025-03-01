const Payment = require("../models/Payment.model");

module.exports.createPayment = async (req, res, next) => {
  const { experience, price, dates } = req.body;
  try {
    const newPayment = new Payment({
      user: req.currentUserId,
      experience,
      price,
      dates: {
        start: dates.start,
      },
    });
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    next(error);
  }
};
