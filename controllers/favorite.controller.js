const Favorite = require("../models/Favorite.model");

module.exports.addToFavorite = async (req, res, next) => {
  const userId = req.currentUserId;
  const experienceId = req.params.id;

  const existingFavorite = await Favorite.findOne({
    user: userId,
    experience: experienceId,
  });
  try {
    if (existingFavorite) {
      await Favorite.deleteOne({ _id: existingFavorite._id });
      res.status(200).json({ message: "Removed from favorites" });
    } else {
      const addFavorite = new Favorite({ user: userId, experience: experienceId });
      await addFavorite.save();
      res.status(201).json({ message: "Added to favorites", addFavorite });
    }
  } catch (error) {
    next(error);
  }
};
