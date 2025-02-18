const Favorite = require("../models/Favorite.model")
const Experience = require("../models/Experience.model");
const Reservation = require("../models/Reservation.model");
// Create experience
module.exports.create = async (req, res, next) => {
    if(req.files) req.body.gallery = req.files.map((file) => file.path);
   console.log("checking availbale dates in the bakcend START--->>", JSON.parse(req.body.availableDates))
    const experience = new Experience({
        ...req.body,
        partner: req.currentUserId,
        gallery: req.body.gallery,
        availableDates: JSON.parse(req.body.availableDates)

      
        
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
  const userId = req.currentUserId
  console.log("*****inside AllTrips controller****")

  try {
    const favorites = await Favorite.find({user: userId})
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
  


  
  // 4. Get All Booked Trips by a User
