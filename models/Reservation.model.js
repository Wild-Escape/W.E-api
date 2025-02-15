const mongoose = require("mongoose");
const ReservationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        experience: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experience",
            required: true,
        },
        status: {   
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        }
        
    }, { timestamps: true }
)

module.exports = mongoose.model("Reservation", ReservationSchema);