const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.createPaymentIntent = async (req, res, next) => {
    console.log("trying to see amount-->", req.body)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: 1000,
      automatic_payment_methods: {
        enabled: true
      },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error)
  }
};

module.exports.getPublishableKey = async (req, res, next) => {
  try {
    res.json({publishableKey : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY })
  } catch (error) {
    next(error);
  }
};
