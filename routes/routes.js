const { Router } = require("express");
const router = Router();

const miscControllers = require("../controllers/misc.controllers");
const authController = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

const experienceController = require("../controllers/experience.controller");

const upload = require("../config/cloudinary.config");

router.get("/", miscControllers.test);

// AUTH CONTROLLERS
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", isAuthenticated, authController.getUser);

// USER CONTROLLERS

//EXPERIENCE CONTROLLERS
// 0. Create a experience
router.post(
  "/experience/create",
  isAuthenticated,
  upload.array("imageUrl", 5),
  experienceController.create
);
// 1. Get all experiences (for users to view available trips)
router.get("/experiences", experienceController.getAllTrips);
// 2. Get details of a specific trip
router.get("/experience/:id", experienceController.getTripById);
// !!!! Move it to the shelter

// 3. Book a experience
router.post("/experience/:id/book", isAuthenticated, experienceController.bookTrip);
// 4. Get all booked experiences by a user
//router.get("/user/experience", isAuthenticated, experienceController.getUserTrips);
// 5. Get details of a specific experience I booked (This is missing)
//router.get("/experience/:id", experienceController.getTripById);

module.exports = router;
