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
    const payments = await Payment.find({ user: req.currentUserId }).populate(
      "user experience"
    );
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

module.exports.getPendingExperiences = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate("user experience");
    const pendingPayments = payments.filter(
      (payment) =>
        payment.experience.partner == req.currentUserId &&
        payment.status === "pending"
    );
    res.status(200).json(pendingPayments);
  } catch (error) {
    next(error);
  }
};

module.exports.confirmExperience = async (req, res, next) => {
  const paymentId = req.params.id;
  try {
    const confirmedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { status: "confirmed",
        partnerConfirmed: true,
       },
      { new: true }
    );
    res.status(200).json(confirmedPayment);
    console.log("Payment donfirmed:", confirmedPayment);
  } catch (error) {
    next(error);
  }
};
module.exports.declineExperience = async (req, res, next) => {
  const paymentId = req.params.id;
  try {
    const declinedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { status: "declined",
       },
      { new: true }
    );
    res.status(200).json(declinedPayment);
    console.log("Payment declined:", confirmedPayment);
  } catch (error) {
    next(error);
  }
};
