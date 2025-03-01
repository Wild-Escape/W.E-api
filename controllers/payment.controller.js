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

module.exports.getBookedExperiences = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.currentUserId }).populate("user experience");
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};