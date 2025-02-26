const Payment = require("../models/Payment.model");

module.exports.createPayment = async (req, res, next) => {
    const { user, experience, price, amount, dates } = req.body;
    try {
        const newPayment = new Payment({
        user: req.currentUserId,
        experience,
        price,
        amount,
        dates,
        });
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        next(error);
    }

}