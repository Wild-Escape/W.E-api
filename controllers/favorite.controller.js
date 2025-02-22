const Favorite = require("../models/Favorite.model");

module.exports.addToFavorite = async (req, res, next) => {
  console.log("entered in add to favorites");
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

module.exports.getFavorites = async (req, res, next) => {
  
  try {
    const favorites = await Favorite.find({user: req.currentUserId}).populate("experience")
    const favExperiences = favorites.map((favorite)=>favorite.experience)
    res.status(200).json({ favExperiences });
  } catch (error) {
    next(error);
  }
}

