const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.createPaymentIntent = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: 1000, // we need to convert the amount to cents (smallest amount of the currency we selected )
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

module.exports.getPublishableKey = async (req, res, next) => {
  try {
    res.json({ publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY });
  } catch (error) {
    next(error);
  }
};
