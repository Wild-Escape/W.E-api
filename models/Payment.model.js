const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    experience: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    // dates: { 
    //   start: { type: Date, required: true },
    //   end: { type: Date, required: true }
    //  },
    price: { 
      amount: { type: Number, required: true },
      currency: { type: String, required: true }
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    partnerConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);




 