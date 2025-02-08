const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shelter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
