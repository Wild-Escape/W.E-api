const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(

  {
    name: { type: String, required: true },
    intro: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String,
       required: true
    },
    
    duration: { type: Number, required: true },
    durationType: {
      type: String,
      enum: ["hour", "day", "week", "month"],
      required: true
    },
    bookedDates : [{type: Date}],
    availableDates: [
      {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
      },
    ],
    type: {
      type: [String],
      enum: ["express", "short stay", "long stay", "mixed stay"],
      required: true,
    },
    activities: { type: String, required: true },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: { type: String, required: true },
    coordinates: {
      lat: {type: Number, required: true},
      lng: {type: Number, required: true}
    },

    gallery: [{ type: String, required: true }],
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: "Review" },
    
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
