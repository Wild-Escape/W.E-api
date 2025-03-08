const Favorite = require("../models/Favorite.model");
const Experience = require("../models/Experience.model");
const Reservation = require("../models/Reservation.model");
// Create experience
module.exports.create = async (req, res, next) => {
  if (req.files) req.body.gallery = req.files.map((file) => file.path);
  console.log("data in create route-->", req.body);
  const experience = new Experience({
    ...req.body,
    partner: req.currentUserId,
    gallery: req.body.gallery,
    availableDates: JSON.parse(req.body.availableDates),
    coordinates: JSON.parse(req.body.coordinates),
  });
  try {
    const newExperience = await experience.save();
    res.status(200).json({ experience });
  } catch (error) {
    next(error);
  }
};
// 1. Get All Experiences (for users to view available trips)
module.exports.getAllExperiences = async (req, res, next) => {
  const userId = req.currentUserId;
  console.log("userId-->", userId);

  try {
    const favorites = await Favorite.find({ user: userId });
    const experiences = await Experience.find().populate("partner");
    res.status(200).json({ experiences, favorites });
  } catch (error) {
    next(error);
  }
};

// 2. Get Details of a Specific Experience
module.exports.getExperienceDetails = async (req, res, next) => {
  try {
    const trip = await Experience.findById(req.params.id).populate("partner");
    res.status(200).json({ trip });
  } catch (error) {
    next(error);
  }
};

// 3. Get the created experiences of a shelter
module.exports.getPartnerExperiences = async (req, res, next) => {
  try {
    const shelterTrips = await Experience.find({ partner: req.currentUserId });
    res.status(200).json({ shelterTrips });
  } catch (error) {
    next(error);
  }
};

module.exports.getPartnerExperienceDetails = async (req, res, next) => {
  try {
    const partnerExperience = await Experience.findById(req.params.id).populate(
      "partner"
    );
    res.status(200).json({ partnerExperience });
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  console.log("entered in update***")
  if (req.files) req.body.gallery = req.files.map((file) => file.path);
  const data = {
    ...req.body,
    partner: req.currentUserId,
    gallery: req.body.gallery,
    availableDates: JSON.parse(req.body.availableDates),
    coordinates: JSON.parse(req.body.coordinates),
  };
  console.log("chech data in update-->", data)
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    res.status(200).json({ updatedExperience });
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    res.status(200).json({ deletedExperience });
  } catch (error) {
    next(error);
  }
};
