const Trip = require ("../models/Trip.model");
const Shelter = require("../models/Experience.model")
const User = require("../models/User.model");

// 1. Get All Trips (for users to view available trips)
exports.getAllTrips = async (req, res) => {
    try {
      const trips = await Trip.find({ status: "confirmed" })
        .populate("shelter", "name location") // Include shelter details
        .populate("user", "name email"); // Include user details
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trips.", error });
    }
  };
  
  // 2. Get Details of a Specific Trip
  exports.getTripById = async (req, res) => {
    const { id } = req.params;
    try {
      const trip = await Trip.findById(id)
        .populate("shelter", "name location description") // Shelter info
        .populate("user", "name email"); // User info
      if (!trip) {
        return res.status(404).json({ message: "Trip not found." });
      }
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip details.", error });
    }
  };
  
  // 3. Book a Trip
  exports.bookTrip = async (req, res) => {
    const { shelterId, checkIn, checkOut, guests } = req.body;
    const userId = req.user.id; // Assuming the user is authenticated and their ID is in req.user
  
    try {
      // Check if the shelter exists
      const shelter = await Shelter.findById(shelterId);
      if (!shelter) {
        return res.status(400).json({ message: "Shelter not found." });
      }
  
      // Create a new trip
      const newTrip = new Trip({
        user: userId,
        shelter: shelterId,
        checkIn,
        checkOut,
        guests,
        status: "pending", // Status is "pending" when booked
      });
  
      await newTrip.save();
  
      // Return the new trip details
      res.status(201).json(newTrip);
    } catch (error) {
      res.status(500).json({ message: "Failed to book the trip.", error });
    }
  };
  
  // 4. Get All Booked Trips by a User
  exports.getUserTrips = async (req, res) => {
    const userId = req.user.id; // Assuming the user is authenticated
  
    try {
      const trips = await Trip.find({ user: userId })
        .populate("shelter", "name location") // Include shelter details
        .populate("user", "name email"); // Include user details
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user trips.", error });
    }
  };