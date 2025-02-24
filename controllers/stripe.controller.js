module.exports.createPaymentIntent = async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        });
        res.json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
}  