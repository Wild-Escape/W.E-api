const Experience = require("../models/Experience.model");
const Reservation = require("../models/Reservation.model");

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