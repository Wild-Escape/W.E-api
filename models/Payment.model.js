const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    experience: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    dates: {
      start: { type: Date, required: true },
      duration: { type: Number },
      durationType: {
        type: String,
      }
    },
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true }
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "declined"],
      default: "pending",
    },
    partnerConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);




