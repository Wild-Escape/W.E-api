const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    experience: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    dates: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    partnerConfirmed: { type: Boolean, default: false },
    stripePaymentIntentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);




 