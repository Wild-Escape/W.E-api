const { Router} = require("express");
const router = Router(); 

const miscControllers = require("../controllers/misc.controllers")
const authController = require("../controllers/auth.controller")
const shelterController = require("../controllers/shelter.controller")
const {isAuthenticated }= require("../middleware/auth.middleware")

const tripController = require("../controllers/trip.controller");


router.get("/", miscControllers.test)

// AUTH CONTROLLERS
router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/me",isAuthenticated, authController.getUser)

// USER CONTROLLERS


//SHELTER CONTROLLERS
router.post("/shelter/create", shelterController.create)

//TRIP CONTROLLERS

// 1. Get all trips (for users to view available trips)
router.get("/trips", tripController.getAllTrips);
// 2. Get details of a specific trip
router.get("/trips/:id", tripController.getTripById);
// !!!! Move it to the shelter 


// 3. Book a trip 
router.post("/trips/:id/book", isAuthenticated, tripController.bookTrip);
// 4. Get all booked trips by a user
router.get("/user/trips", isAuthenticated, tripController.getUserTrips);
// 5. Get details of a specific trip I booked (This is missing)
router.get("/trips/:id", tripController.getTripById);


module.exports = router; 