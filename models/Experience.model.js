const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    intro: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: [String], required: true },
    duration: { type: Number, required: true },
    dates: { type: Number, required: true },
    type: { type: [String], enum: ['express', 'short stay', 'long stay'], required: true },
    activities: { type: String, required: true },
    partner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },
    coordinates: {
      latitude:  {
        type: Number,
        required: true,
        min: [-90, "Latitude must be between -90 and 90"],
        max: [90, "Latitude must be between -90 and 90"],
      },
      longitude: {
        type: Number,
        required: true,
        min: [-180, "Longitude must be between -180 and 180"],
        max: [180, "Longitude must be between -180 and 180"],
      }
    },
    gallery: { type: String, required: true },
    favorites: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: "Review" },
    highlights: { type: [String] },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Experience", ExperienceSchema);
