const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    intro: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: [String], required: true },
    duration: { type: Number, required: true },
    dates: { type: Number, required: true },
    type: {
      type: [String],
      enum: ["express", "short stay", "long stay"],
      required: true,
    },
    activities: { type: String, required: true },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: { type: String, required: true },
    coordinates: { type: String, required: true },

    gallery: [{ type: String, required: true }],
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
    toJSON: {
      virtuals: true,
    },
  }
);

ExperienceSchema.virtual("favorites", {
  ref: "Favorite",
  localField: "_id",
  foreignField: "experience",
});

module.exports = mongoose.model("Experience", ExperienceSchema);
