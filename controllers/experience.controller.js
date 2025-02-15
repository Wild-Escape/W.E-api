const User = require("../models/User.model");
const Experience = require("../models/Experience.model");
const Reservation = require("../models/Reservation.model");
// Create experience
module.exports.create = async (req, res, next) => {
    if(req.files) req.body.gallery = req.files.map((file) => file.path);
    const experience = new Experience({
        ...req.body,
        partner: req.currentUserId,
        gallery: req.body.gallery,

    })
    try {
        const newExperience = await experience.save();
        res.status(200).json({ experience });
    } catch (error) {
        next(error);
    }
};
// 1. Get All Trips (for users to view available trips)
module.exports.getAllTrips = async (req, res, next) => {
  try {
    const trips = await Experience.find();
    res.status(200).json({ trips });
  } catch (error) {
    next(error);
  }
}
  
  // 2. Get Details of a Specific Trip
module.exports.getTripById = async (req, res, next) => {
  try {
    const trip = await Experience.findById(req.params.id);
    res.status(200).json({ trip });
  } catch (error) {
    next(error);
  } }
  
  // 3. Book a Trip
  module.exports.bookTrip = async (req, res, next) => {
    const tripId = req.params.id;
    const userId = req.currentUserId;
    try {
      const trip = await Experience.findById(tripId);
      if (!trip) {
        return next(createError(404, "Trip not found"));
      } else {
        const reservation = new Reservation({
          user: userId,
          experience: tripId,
        });
        const newReservation = await reservation.save();
        res.status(200).json({ newReservation });
      }
    } catch (error) {
      next(error);
    }
  }

  
  // 4. Get All Booked Trips by a User
