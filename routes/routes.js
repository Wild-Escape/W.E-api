const { Router } = require("express");
const router = Router();

const miscControllers = require("../controllers/misc.controllers");
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

const experienceController = require("../controllers/experience.controller");
const reservationController = require("../controllers/reservation.controller");
const favoriteController = require("../controllers/favorite.controller")

const upload = require("../config/cloudinary.config");

router.get("/", miscControllers.test);

// AUTH CONTROLLERS
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", isAuthenticated, authController.getUser);

// USER CONTROLLERS

//EXPERIENCE CONTROLLERS
// 1. Create a experience
router.post(
  "/experience/create",
  isAuthenticated,
  upload.array("imageUrl", 5),
  experienceController.create
);
// 2. Get all experiences (for users to view available trips)
router.get("/experiences",  experienceController.getAllTrips);
// 3. Get details of a specific trip
router.get("/experience/:id",isAuthenticated, experienceController.getTripById);


// RESERVATION CONTROLLER
//1. Book a experience
router.post("/experience/:id/book", isAuthenticated, reservationController.bookTrip);
// 2. Get details of a specific experience I booked (This is missing)
//router.get("/experience/:id", reservationController.getReservationDetails);
// 3. Get all booked experiences by a user
//router.get("/user/experience", isAuthenticated, reservationController.getUserExperiences);

// FAVORITES CONTROLLERS
router.post("/experiences/:id/favorite", isAuthenticated, favoriteController.addToFavorite )

module.exports = router;
